# Task Board Starter Code

## Description

The Task Board is a simple web application designed to help project team members manage their tasks effectively. It provides a visual representation of tasks organized into columns representing different stages of progress: "Not Yet Started", "In Progress", and "Completed". Each task can be added, dragged between columns, and deleted as needed, with progress saved in localStorage to persist across page reloads.

## Features

- **Task Management**: Add new tasks with a title, description, and deadline.
- **Drag-and-Drop**: Easily update the progress state of tasks by dragging them between columns.
- **Deadline Tracking**: Tasks are color-coded based on their deadline—red for overdue tasks, yellow for tasks due soon, and light for tasks with deadlines further away.
- **Persistent Storage**: All tasks are stored in localStorage, ensuring that the task board state is preserved even after refreshing the page.
  
## Technologies Used

- **HTML5**: Structure and layout of the web page.
- **CSS3**: Styling of the task board and color coding for deadlines.
- **JavaScript (jQuery)**: Dynamic interactions, drag-and-drop functionality, and DOM manipulation.
- **Day.js**: Library used for date manipulation and comparison.
- **Bootstrap**: CSS framework for responsive design and UI components.

## License

This project is open-source and available under the MIT License. See the LICENSE file for more information.