🗂️ Task Manager Application
This is a full-stack task management application developed using Laravel for the backend and Vue 3 with Vuetify for the frontend. It allows users to manage tasks efficiently by adding, editing, viewing, deleting, and marking them as completed. Tasks are categorized by priority, and the UI includes progress tracking and a calendar view for daily productivity.

📌 Functionalities
Users can perform full CRUD operations on tasks. Each task can be assigned a priority: urgent, mid, or low. Tasks can also be marked as completed, and removed if no longer needed. A search function is included to help users find specific tasks easily.
A calendar is displayed on the interface to show the current date, helping users stay aware of the day’s context while managing their task list.
Each priority level (urgent, mid, and low) includes its own progress bar that updates dynamically as tasks in that category are completed. This allows users to visually track their progress across different task priorities.

👤 User Authentication
The application includes user authentication with account registration and secure login functionality. Token-based authentication is implemented using Laravel Sanctum, ensuring secure access to all task-related features. Each user has their own account and can only view and manage their own tasks.

🌐 Technologies
The frontend is built with Vue 3 and Vuetify, providing a modern and responsive UI. State management is handled with Pinia, and Axios is used for API communication. The backend is powered by Laravel and follows the MVC architecture pattern. Models are used to represent users and tasks, controllers handle application logic, and middleware is used to protect authenticated routes.

🧩 Architecture Overview
The backend follows the MVC structure:
-Models define the structure and relationships for tasks and users.
-Controllers manage CRUD operations, authentication, and task updates.
-Routes are protected with authentication middleware.
-Custom action classes are used to handle operations like marking a task as completed or deleted

⚙️ Installation Instructions
git clone --git repo link

-Backend setup ->
composer install
php artisan migrate
php artisan serve

-Frontend setup ->
cd task_manager
npm install
npm run dev

👤 Authors
This project was created by Angela Apostolska 237001 and Stefani Akimovska 237014.
