# Event Talks Schedule Website

A simple, clean, and responsive single-page web application to display the schedule for a one-day technical conference. The frontend is built with standard HTML, CSS, and JavaScript, and the backend is powered by Node.js and Express.

## ✨ Features

*   **Dynamic Schedule Display:** The entire event schedule is generated dynamically from a JSON data source.
*   **Automatic Break Calculation:** Automatically inserts 10-minute transition breaks between talks and a 1-hour lunch break.
*   **Live Category Filtering:** A search box allows users to instantly filter the talks by category (e.g., "JavaScript", "AI", "CSS") without a page reload.
*   **Responsive Design:** The layout is optimized for a good viewing experience on both desktop and mobile devices.
*   **Lightweight & Fast:** Built with a minimal technology stack for fast loading and performance.

## 🛠️ Tech Stack

*   **Backend:** Node.js, Express.js
*   **Frontend:** HTML, CSS, JavaScript (ES6+)
*   **Data Format:** JSON

## 📂 Project Structure

```
/ohmp-event-talks-app
├── data/
│   └── talks.json        # Contains the data for all talks
├── public/
│   ├── index.html        # Main HTML file (the page structure)
│   ├── style.css         # All styles for the application
│   └── script.js         # Frontend logic, API fetching, and UI rendering
├── .gitignore            # Specifies files for git to ignore
├── package.json          # Project metadata and dependencies
├── server.js             # The main Express.js server file
└── README.md             # This file
```

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You must have Node.js and npm (Node Package Manager) installed on your system. You can download them from [nodejs.org](https://nodejs.org/).

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/ohmp/ohmp-event-talks-app.git
    ```

2.  **Navigate to the project directory:**
    ```sh
    cd ohmp-event-talks-app
    ```

3.  **Install the dependencies:**
    ```sh
    npm install
    ```

4.  **Run the server:**
    ```sh
    npm start
    ```
    *(This will execute `node server.js` as defined in `package.json`)*

5.  **Open the application:**
    Open your web browser and navigate to `http://localhost:3000`.

## 🔌 API Endpoint

The application uses a single API endpoint to serve the schedule data to the frontend.

### `GET /api/talks`

*   **Description:** Retrieves the list of all talks for the event.
*   **Method:** `GET`
*   **Response:** A JSON array of talk objects.
*   **Example Response Body:**
    ```json
    [
      {
        "title": "The Future of JavaScript Frameworks",
        "speakers": ["Jane Doe"],
        "category": ["JavaScript", "WebDev", "Frontend"],
        "duration": 60,
        "description": "A deep dive into the trends and future..."
      },
      // ... more talk objects
    ]
    ```
