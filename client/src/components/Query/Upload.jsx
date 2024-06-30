import React from "react";
import {toast} from "react-hot-toast"

const Upload = () => {
  const [inputs, setInputs] = React.useState({
    name: "",
    subject: "",
    file: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", inputs.name);
    formData.append("subject", inputs.subject);
    formData.append("file", inputs.file);
    try {
      const res = await fetch("/api/file/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.status === 200) {
        toast.success("uploaded successfully");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-2 py-20 lg:px-8">
      <div className="bg-white p-10 sm:mx-auto sm:w-full sm:max-w-2xl rounded-3xl">
        <div className="sm:mx-auto py-3 sm:w-full sm:max-w-sm">
          <h2 className=" text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
            Upload Document
          </h2>
        </div>

        <div className="py-2 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-2" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-base font-medium leading-6 px-3 text-gray-900"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Enter name of file"
                  value={inputs.name}
                  onChange={(e) =>
                    setInputs({ ...inputs, name: e.target.value })
                  }
                  required
                  className="bg-white  text-gray-900 block w-full rounded-md border-0 p-2 
                   shadow-sm ring-1 ring-inset  placeholder:text-gray-400  sm:text-base sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-base font-medium leading-6 px-3 text-gray-900"
              >
                Subject
              </label>
              <div className="mt-2">
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  autoComplete="text"
                  placeholder="Enter name of subject i.e math"
                  value={inputs.subject}
                  onChange={(e) =>
                    setInputs({ ...inputs, subject: e.target.value })
                  }
                  required
                  className="bg-white text-gray-900 block w-full rounded-md border-0 p-2 
                   shadow-sm ring-1 ring-inset  placeholder:text-gray-400 sm:text-base sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="file"
                className="block text-base font-medium leading-6 px-3 text-gray-900"
              >
                Upload file
              </label>
              <div className="mt-2">
                <input
                  id="file"
                  name="file"
                  type="file"
                  onChange={(e) =>
                    setInputs({ ...inputs, file: e.target.files[0] })
                  }
                  required
                  className="block bg-white text-gray-900 w-full rounded-md border-0 p-2  
                      shadow-sm ring-1 ring-inset  placeholder:text-gray-400  sm:text-base sm:leading-6"
                />
              </div>
            </div>
            <div className="mt-2">
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 p-2 mt-8 text-base font-semibold leading-6
                 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 
                 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Upload
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Upload;
