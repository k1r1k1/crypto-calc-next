import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Error - 404',
}

const Page = () => {
    return (
      <div className="container d-flex justify-content-center p-5">
        <div className="card w-50">
          <div className="card-body text-center">
            <h1>404</h1>
            <p>Something went wrong...</p>
            <a href="/">Go home</a>
          </div>
        </div>
      </div>
    );
  }
  
  export default Page
  