import { useDispatch } from "react-redux";
import { logIn } from "../redux/auth/operations";
import axios from 'axios'; 
export default function Login() {
  const dispatch = useDispatch();


const handleSubmit = async (e) => {
  e.preventDefault();
  const form = e.currentTarget;
  
  try {
    const response = await axios.post('https://connections-api.goit.global/users/login', {
      email: form.elements.email.value,
      password: form.elements.password.value,
    });
    console.log("Успіх!", response.data);
  } catch (error) {
    console.error("Помилка:", error.response ? error.response.data : error.message);
  }
};

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", width: "300px", margin: "20px auto" }}>
      <input type="email" name="email" placeholder="Email" required />
      <input type="password" name="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  );
}