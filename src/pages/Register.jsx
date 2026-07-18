import { useDispatch } from "react-redux";
import { register } from "../redux/auth/operations";

export default function Register() {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    dispatch(register({
      name: form.elements.name.value,
      email: form.elements.email.value,
      password: form.elements.password.value,
    }));
    form.reset();
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", width: "300px", margin: "20px auto" }}>
      <input type="text" name="name" placeholder="Name" required />
      <input type="email" name="email" placeholder="Email" required />
      <input type="password" name="password" placeholder="Password" required />
      <button type="submit">Register</button>
    </form>
  );
}