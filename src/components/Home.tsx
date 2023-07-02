import { useNavigate } from "react-router-dom"

export const Home = () => {
  const navigate = useNavigate()
  return (
    <div>
      <button onClick={() => navigate("/vendors-list")}>
        Go to vendors list
      </button>
    </div>
  )
}
