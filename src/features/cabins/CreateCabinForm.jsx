import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import { useForm } from 'react-hook-form';
import FormRow from '../../ui/FormRow';
import { useCreateCabin } from './useCreateCabin';
import { useEditCabins } from './useEditCabin';

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
    const { id: editId, ...editValues } = cabinToEdit;
    const isEditing = Boolean(editId);

    const { register, handleSubmit, reset, formState, getValues } = useForm({
        defaultValues: isEditing ? editValues : {},
    });
    const { errors } = formState;

    const { createCabin, isLoading } = useCreateCabin();
    const { editCabin } = useEditCabins();

    const onSubmit = (data) => {
        const image =
            typeof data.image === 'string' ? data.image : data.image[0];
        if (isEditing) {
            editCabin({ newCabin: { ...data, image }, id: editId });
            return;
        }
        createCabin(
            { ...data, image: image },
            {
                onSuccess: () => {
                    reset();
                    onCloseModal?.();
                },
            }
        );
    };

    const onError = (errors) => {};

    return (
        <Form
            onSubmit={handleSubmit(onSubmit, onError)}
            type={onCloseModal ? 'modal' : 'regular'}
        >
            <FormRow label='Cabin name' error={errors?.name?.message}>
                <Input
                    type='text'
                    id='name'
                    {...register('name', {
                        required: 'Cabin name is required',
                    })}
                />
            </FormRow>

            <FormRow
                label='Maximum capacity'
                error={errors?.max_capacity?.message}
            >
                <Input
                    type='number'
                    id='max_capacity'
                    {...register('max_capacity', {
                        required: 'Maximum capacity is required',
                        min: {
                            value: 1,
                            message: 'Maximum capacity must be at least 1',
                        },
                        max: {
                            value: 6,
                            message: 'Maximum capacity must be at most 6',
                        },
                    })}
                />
            </FormRow>

            <FormRow
                label='Regular price'
                error={errors?.regular_price?.message}
            >
                <Input
                    type='number'
                    id='regular_price'
                    {...register('regular_price', {
                        required: 'Regular price is required',
                        validate: (value) => {
                            if (value <= 0) {
                                return 'Regular price must be greater than 0';
                            }
                        },
                    })}
                />
            </FormRow>

            <FormRow label='Discount' error={errors?.discount?.message}>
                <Input
                    type='number'
                    id='discount'
                    defaultValue={0}
                    {...register('discount', {
                        required: 'Discount is required',
                        validate: (value) => {
                            if (value >= getValues('regular_price')) {
                                return 'Discount must be less than regular price';
                            }
                        },
                    })}
                />
            </FormRow>

            <FormRow
                label='Description for website'
                error={errors?.description?.message}
            >
                <Textarea
                    type='number'
                    id='description'
                    defaultValue=''
                    {...register('description', {
                        required: 'Description is required',
                    })}
                />
            </FormRow>

            <FormRow label='Cabin photo'>
                <FileInput
                    id='image'
                    accept='image/*'
                    {...register('image', {
                        required: isEditing ? false : 'Image is required',
                    })}
                />
            </FormRow>

            <FormRow>
                {/* type is an HTML attribute! */}
                <Button
                    $variation='secondary'
                    type='reset'
                    onClick={() => onCloseModal?.()}
                >
                    Cancel
                </Button>
                <Button disabled={isLoading}>
                    {isEditing ? 'Edit cabin' : 'Add cabin'}
                </Button>
            </FormRow>
        </Form>
    );
}

export default CreateCabinForm;
