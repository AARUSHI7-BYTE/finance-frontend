Overview

This is the frontend application for the Personal Finance Tracker.

It allows users to:
	•	Add income & expense transactions
	•	Create monthly budgets
	•	Track savings goals
	•	View expense charts
	•	Monitor progress visually

All data is user-specific and secured via Supabase Auth.

🛠 Tech Stack
	•	React.js
	•	React Router
	•	Axios
	•	Tailwind CSS
	•	Chart.js
	•	Supabase Auth

Project Structure
frontend/
│
├── src/
│   ├── components/
        ├── navbar.jsx
        ├── transactionlist.jsx
│   │   ├── ExpenseForm.jsx
│   │   ├── TransactionList.jsx
│   │   ├── BudgetForm.jsx
│   │   ├── BudgetCard.jsx
│   │   ├── GoalForm.jsx
│   │   ├── GoalCard.jsx
│   │   └── Charts.jsx
│   │
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Transactions.jsx
│   │   ├── Budgets.jsx
│   │   └── Goals.jsx
        └── login.jsx
        └── Register.jsx
│   │
│   ├── api/
│   │   └── axios.js
│   │
│   └── App.jsx
    └── App.css
    └── main.jsx
    └── index.css
    

🚀 Setup Instructions

1️⃣ Clone Repository
git clone <repo-url>
cd frontend

2️⃣ Install Dependencies
npm install

3️⃣ Environment Variables
Create .env file:
VITE_API_URL=http://localhost:3500/api
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key

4️⃣ Run App
npm run dev

📊 Features

Transactions
	•	Add income/expense
	•	Category-based tracking
	•	Delete transactions

Budgets
	•	Monthly category budgets
	•	Auto calculation of spent amount
	•	Progress bar visualization
	•	Delete budget

Goals
	•	Create savings goals
	•	Add contributions
	•	Visual completion tracking
	•	Delete goals

Dashboard
	•	Category-wise expense graph
	•	Emerald-themed UI

⸻

📈 Future Improvements
	•	Edit functionality for all modules
	•	Recurring payments automation
	•	CSV export
	•	Analytics dashboard
	•	AI spending insights
	•	Group expense sharing
