import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="flex flex-col items-center justify-center h-screen" id="error-page">
      <h1>Oops!</h1>
      <p className="mt-3 font-bold">Ein unerwartetes Problem ist aufgetreten. Sicher, dass die von Ihnen aufgerufene Seite existiert?</p>
      <p className="mt-3">
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
