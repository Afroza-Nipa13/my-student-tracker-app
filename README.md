📚 Student Life Toolkit

A React-based web application designed to make student life easier by helping them track classes, manage budgets, plan studies, and prepare for exams — all in one place!

🚀 Live Demo

🔗 Live Link: https://your-app-link.com

🔗 Backend API: https://your-backend-link.com

✨ Features
1️⃣ Class Schedule Tracker 🗓️

Add, edit, or delete classes (subject, time, day, instructor).

Color-coded subjects for quick identification.

Responsive weekly view to never miss a class.

2️⃣ Budget Tracker 💰

Track income (allowance, part-time jobs, scholarships) and expenses (food, transport, books).

Interactive charts and graphs for clear financial insights.

Validations to prevent negative values or invalid inputs.

3️⃣ Exam Q&A Generator 📝

Generate random practice questions (MCQs, True/False, Short Answers).

Choose difficulty level (Easy, Medium, Hard).

Perfect for daily exam prep sessions.

4️⃣ Study Planner 📖

Break down big study goals into smaller, manageable tasks.

Allocate time and day slots for each subject/topic.

Set priority level and deadline for each task.

🌟 Unique Feature

✅ Personalized Dashboard with Progress Tracking

Displays upcoming classes, remaining budget, and study task progress in one view.

Motivational quote generator to inspire students daily. 💡

🛠️ Tech Stack
Category	Technology
Frontend	React, React Router, Tailwind CSS, DaisyUI, React Hook Form
State Management	React Context API / TanStack Query
Backend	Node.js, Express.js
Database	MongoDB
Authentication	Firebase Authentication
Charts	Recharts
Notifications	SweetAlert2, React-Hot-Toast
📂 Folder Structure
student-life-toolkit/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── context/
│   │   ├── routes/
│   │   └── utils/
│   └── package.json
│
└── backend/
    ├── routes/
    ├── models/
    ├── controllers/
    └── server.js

⚙️ Installation & Setup
1️⃣ Clone the repository:
git clone https://github.com/your-username/student-life-toolkit.git
cd student-life-toolkit

2️⃣ Setup Frontend:
cd frontend
npm install
npm run dev

3️⃣ Setup Backend:
cd backend
npm install
npm start

4️⃣ Environment Variables:

Create a .env file in backend with:

PORT=5000
DB_USER=your_mongodb_user
DB_PASS=your_mongodb_pass
JWT_SECRET=your_secret_key


And in frontend create .env.local:

VITE_API_URL=http://localhost:5000
VITE_FIREBASE_API_KEY=your_firebase_api_key

🖼️ Screenshots
Class Schedule	Budget Tracker	Study Planner

	
	
🎥 Presentation Video

▶️ Watch Presentation Video

📌 Future Improvements

Add offline mode with localStorage sync.

AI-powered study suggestions based on exam dates.

Notifications/reminders for upcoming classes & deadlines.

🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

📝 License

This project is licensed under the MIT License – feel free to use and modify for educational purposes.