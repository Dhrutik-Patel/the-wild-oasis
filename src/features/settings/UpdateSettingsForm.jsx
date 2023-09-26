import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import { useEditSettings } from './useEditSetting';
import { useSetting } from './useSetting';

function UpdateSettingsForm() {
    const { settingsData, isLoading } = useSetting();
    const { editSetting, isLoading: isEditing } = useEditSettings();

    const handleEditSettings = (ev, field) => {
        const value = ev.target.value;

        if (!value) return;
        editSetting({ [field]: value });
    };

    return (
        <Form>
            <FormRow label='Minimum nights/booking'>
                <Input
                    type='number'
                    id='min-nights'
                    defaultValue={settingsData?.min_booking_length}
                    disabled={isLoading || isEditing}
                    onBlur={(ev) =>
                        handleEditSettings(ev, 'min_booking_length')
                    }
                />
            </FormRow>

            <FormRow label='Maximum nights/booking'>
                <Input
                    type='number'
                    id='max-nights'
                    defaultValue={settingsData?.max_booking_length}
                    disabled={isLoading || isEditing}
                    onBlur={(ev) =>
                        handleEditSettings(ev, 'max_booking_length')
                    }
                />
            </FormRow>

            <FormRow label='Maximum guests/booking'>
                <Input
                    type='number'
                    id='max-guests'
                    defaultValue={settingsData?.max_guest_per_booking}
                    disabled={isLoading || isEditing}
                    onBlur={(ev) =>
                        handleEditSettings(ev, 'max_guest_per_booking')
                    }
                />
            </FormRow>

            <FormRow label='Breakfast price'>
                <Input
                    type='number'
                    id='breakfast-price'
                    defaultValue={settingsData?.breakfast_price}
                    disabled={isLoading || isEditing}
                    onBlur={(ev) => handleEditSettings(ev, 'breakfast_price')}
                />
            </FormRow>
        </Form>
    );
}

export default UpdateSettingsForm;
