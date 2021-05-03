import AuthProvider from "../src/auth/AuthProvider";
import AppRouter from "../src/routes/AppRouter.jsx";

function App() {
  return (
    <div>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </div>
  );
}

export default App;
