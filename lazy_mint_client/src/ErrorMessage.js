export default function ErrorMessage({ message }) {
    if (!message) return null;
  
    return (
      <div className="alert alert-error">

          <h1>{message}</h1>
        </div>
      
    );
  }
  