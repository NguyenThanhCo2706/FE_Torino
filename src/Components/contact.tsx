
export const Contact = () => {

  return (
    <div className="flex flex-col items-center w-1/2 mx-auto my-[30px]">
      <h1 className="text-[30px] font-bold">Contact Us</h1>
      <span className="text-center mb-6">These have a modern and minimal design, and you could edit the visual aesthetic of the form to match your company's branding</span>
      <div className="mb-6 w-full">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
        <input type="email" id="email" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com" required />
      </div>
      <div className="mb-6 w-full">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Subject</label>
        <input type="text" id="first_name" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Subject" required />
      </div>
      <div className="mb-6 w-full">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
        <textarea id="message" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
      </div>
      <div className="mb-6">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
          Send Message
        </button>
      </div>
    </div>
  )
}