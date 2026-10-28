export const colleges = [
  { id: 1, name: "Veermata Jijabai Technological Institute", short: "VJTI", state: "Maharashtra", intake: 1200, enrolled: 1184, score: 94, status: "Reporting" },
  { id: 2, name: "College of Engineering Pune", short: "COEP", state: "Maharashtra", intake: 900, enrolled: 912, score: 88, status: "Reporting" },
  { id: 3, name: "PSG College of Technology, Coimbatore", short: "PSG Tech", state: "Tamil Nadu", intake: 1100, enrolled: 1068, score: 92, status: "Reporting" },
  { id: 4, name: "RV College of Engineering, Bengaluru", short: "RVCE", state: "Karnataka", intake: 1300, enrolled: 1342, score: 85, status: "Reporting" },
  { id: 5, name: "Delhi Technological University", short: "DTU", state: "Delhi", intake: 1000, enrolled: 987, score: 90, status: "Reporting" },
  { id: 6, name: "Thapar Institute of Engineering and Technology, Patiala", short: "Thapar", state: "Punjab", intake: 1250, enrolled: 1201, score: 79, status: "Under review" },
  { id: 7, name: "Heritage Institute of Technology, Kolkata", short: "Heritage", state: "West Bengal", intake: 600, enrolled: 641, score: 66, status: "Under review" },
  { id: 8, name: "Government Engineering College, Gandhinagar", short: "GEC Gandhinagar", state: "Gujarat", intake: 720, enrolled: 698, score: 82, status: "Pending" },
];

export const students = [
  { id: 1, name: "Ananya Deshmukh", apaar: "4521 8830 1176", college: 1, course: "B.Tech Computer Engineering", year: "Final year" },
  { id: 2, name: "Rahul Iyer", apaar: "7203 1146 9082", college: 3, course: "B.Tech Mechanical Engineering", year: "Third year" },
  { id: 3, name: "Fatima Khan", apaar: "3318 5507 2269", college: 2, course: "B.Tech Civil Engineering", year: "Second year" },
  { id: 4, name: "Arjun Nair", apaar: "9046 2281 7753", college: 4, course: "B.Tech Information Science", year: "Final year" },
  { id: 5, name: "Simran Kaur", apaar: "5129 6630 4418", college: 5, course: "B.Tech Electrical Engineering", year: "Third year" },
  { id: 6, name: "Debashish Roy", apaar: "2874 9015 3361", college: 7, course: "B.Tech Electronics and Communication", year: "Second year" },
  { id: 7, name: "Kavita Patel", apaar: "6651 3402 1987", college: 8, course: "B.Tech Chemical Engineering", year: "First year" },
  { id: 8, name: "Siddharth Joshi", apaar: "8230 7714 5546", college: 1, course: "B.Tech Electronics Engineering", year: "Second year" },
  { id: 9, name: "Meera Pillai", apaar: "1457 8802 6639", college: 1, course: "B.Tech Information Technology", year: "Third year" },
  { id: 10, name: "Harpreet Singh", apaar: "4093 6728 1150", college: 6, course: "B.Tech Mechanical Engineering", year: "Final year" },
  { id: 11, name: "Lakshmi Narayanan", apaar: "7761 2094 3827", college: 3, course: "B.Tech Biotechnology", year: "Second year" },
  { id: 12, name: "Imran Qureshi", apaar: "3905 1478 8264", college: 2, course: "B.Tech Computer Engineering", year: "Final year" },
];

export const cert = { token: "AC26-VJTI-004187", degree: "Bachelor of Technology", year: 2026 };
export const verifyUrl = (t) => "https://verify.aicte.example/c/" + t;

export const sampleRows = [
  { name: "Rohan Patil", apaar: "6102 4478 3395", dob: "12-03-2004", course: "B.Tech Computer Engineering" },
  { name: "Sneha Kulkarni", apaar: "7340 1189 227", dob: "27-08-2004", course: "B.Tech Electronics Engineering", bad: { apaar: { msg: "Must be 12 digits", fix: "7340 1189 2276" } } },
  { name: "Mohammed Faizan Shaikh", apaar: "8815 2290 6043", dob: "05-11-2003", course: "B.Tech Information Technology" },
  { name: "Priya Nair", apaar: "3329 7716 0482", dob: "2004/07/21", course: "B.Tech Computer Engineering", bad: { dob: { msg: "Use DD-MM-YYYY", fix: "21-07-2004" } } },
  { name: "Vikram Joshi", apaar: "5560 9134 7281", dob: "9.1.2004", course: "B.Tech Electronics Engineering", bad: { dob: { msg: "Use DD-MM-YYYY", fix: "09-01-2004" } } },
  { name: "Mohammed Faizan Shaikh", apaar: "8815 2290 6043", dob: "05-11-2003", course: "B.Tech Information Technology", bad: { apaar: { msg: "Possible duplicate of row 3" } } },
  { name: "Kavya   Reddy", apaar: "9918 3305 7742", dob: "30-01-2004", course: "B.Tech Computer Engineering", bad: { name: { msg: "Remove extra spaces", fix: "Kavya Reddy" } } },
  { name: "Aditya Menon", apaar: "2907 6651 8820", dob: "17-06-2004", course: "B.Tech Information Technology" },
];

export const months = [
  { m: "Jun", n: 1240 }, { m: "Jul", n: 2860 }, { m: "Aug", n: 3410 },
  { m: "Sep", n: 1980 }, { m: "Oct", n: 940 }, { m: "Nov", n: 520 },
];

export const flagged = [
  { id: 1, student: "Imran Qureshi", apaar: "3905 1478 8264", college: "COEP", reason: "Same student in two colleges", severity: "High", status: "Pending" },
  { id: 2, student: "Batch 2026 intake", apaar: "-", college: "Heritage", reason: "Admissions above intake (641 of 600)", severity: "Medium", status: "Pending" },
  { id: 3, student: "Harpreet Singh", apaar: "4093 6728 115", college: "Thapar", reason: "Invalid APAAR ID", severity: "Low", status: "Pending" },
  { id: 4, student: "Batch 2026 intake", apaar: "-", college: "RVCE", reason: "Admissions above intake (1342 of 1300)", severity: "Medium", status: "Pending" },
];

export const alerts = [
  { id: 1, text: "Name changed for APAAR 4521 8830 1176, re-verification needed", t: "Today, 10:42" },
  { id: 2, text: "Course updated for APAAR 7203 1146 9082", t: "Yesterday, 16:10" },
  { id: 3, text: "Duplicate record resolved for APAAR 3905 1478 8264", t: "25 Oct, 11:25" },
];

export const audit = [
  { t: "09:48", actor: "Neha Bhatt", text: "Updated role for Pooja Chauhan to Verifier" },
  { t: "09:31", actor: "Dr. Sunita Rao", text: "Opened flagged queue" },
  { t: "09:12", actor: "Manoj Kulkarni", text: "Downloaded VJTI quality report" },
];

export const users = [
  { name: "Neha Bhatt", role: "AICTE admin", college: "AICTE head office" },
  { name: "Dr. Sunita Rao", role: "AICTE reviewer", college: "AICTE head office" },
  { name: "Manoj Kulkarni", role: "Institution admin", college: "VJTI" },
  { name: "Rajesh Menon", role: "Institution admin", college: "RVCE" },
  { name: "Ananya Deshmukh", role: "Student", college: "VJTI" },
  { name: "Pooja Chauhan", role: "Verifier", college: "External employer" },
];
