# The Wild Oasis Hotel Management Application

The Wild Oasis Hotel Management Application is a comprehensive internal hotel management system built with a modern tech stack, including Next.js, Prisma, MongoDB, TypeScript, Tailwind CSS, and more. This application empowers hotel employees to efficiently manage hotel bookings, cabins, and guest information. Below is an overview of the application's features and technologies used.

## Features

### User Authentication and Signup

-   Hotel employees can log in to the application securely.
-   New users can only sign up within the application to ensure employee-only access.

### User Profile Management

-   Users can personalize their profiles by uploading avatars.
-   Profile details such as name and password can be easily updated.

### Cabin Management

-   A user-friendly table view displays all cabins with detailed information.
-   Cabin details include photos, names, capacity, prices, and current discounts.
-   Users can perform actions like updating or deleting existing cabins.
-   Creating new cabins is simplified, with the ability to upload photos.

### Booking Management

-   A comprehensive table view presents all booking information.
-   Booking details encompass arrival and departure dates, booking status, paid amounts, cabin specifics, and guest data.
-   Booking status can be "unconfirmed," "checked in," or "checked out."
-   The table view is filterable by booking status.
-   Additional booking data includes guest count, duration, observations, and breakfast options.
-   Users can perform actions like deleting, checking in, or checking out guests.

### Guest Data Management

-   Guest data contains full names, emails, national IDs, nationalities, and country flags for quick identification.

### Dashboard

-   The initial app screen serves as a dynamic dashboard with key insights.
-   It displays a list of guests checking in and out on the current day.
-   Users can efficiently manage related tasks from the dashboard.
-   The dashboard provides statistics on recent bookings, sales, check-ins, and occupancy rates.
-   Chart visualizations show daily hotel sales, distinguishing between "total" sales and "extras" sales (e.g., breakfast).
-   Stay duration statistics are also available to track an essential hotel metric.

### Application-wide Settings

-   Users can define global settings, such as breakfast prices, minimum and maximum nights per booking, and maximum guests per booking.

### Dark Mode

-   The application offers a dark mode option for improved visibility in low-light conditions.

## Technologies Used

The Wild Oasis Hotel Management Application leverages a robust tech stack:

-   **React**: JavaScript library for building the user interface.
-   **Supabase**: Cloud database service for real-time and secure data storage.
-   **@tanstack/react-query**: Data-fetching and state management library for React.
-   **date-fns**: JavaScript date utility library for parsing, formatting, and manipulating dates.
-   **react-router-dom**: Library for routing and navigation in React apps.
-   **recharts**: Composable charting library for React.
-   **styled-components**: CSS-in-JS library for styling React components.
-   **react-hot-toast**: Customizable toast notification library for React.
-   **react-icons**: Collection of customizable icons for React apps.
-   **react-hook-form**: Library for form state management and validation in React.

## Getting Started

To get started with The Wild Oasis Hotel Management Application, follow these steps:

1. Clone the repository to your local machine.

2. Install dependencies using npm or yarn.

or

3. Configure application settings as needed, including database connection details and environment variables.

4. Run the application.

## Contributing

We welcome contributions to enhance and improve The Wild Oasis Hotel Management Application. Please check our [contribution guidelines](CONTRIBUTING.md) for more information on how to get involved.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

We would like to express our gratitude to the open-source community for their invaluable contributions and support in building this application.

---

For more information and updates, visit our [website](https://www.wildoasishotel.com) or contact us at support@wildoasishotel.com.

Thank you for choosing The Wild Oasis Hotel Management Application!
