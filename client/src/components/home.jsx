import { Fragment, useState } from 'react'
import { FaceSmileIcon as FaceSmileIconOutline, PaperClipIcon } from '@heroicons/react/24/outline'
import axios from 'axios';

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_API_KEY);


export default function Home() {
  const [userMessage, setUserMessage] = useState('');

  const sendMessage = async () => {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = {userMessage};

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log(text);
  }

  return (
    <div className="flex items-start space-x-4">
      <div className="min-w-0 flex-1">
        <form action="#">
          <div className="border-b border-gray-200 focus-within:border-teal-600">
            <label htmlFor="comment" className="sr-only">
              Add the URL or paste the content you would like to analyze...
            </label>
            <textarea
              rows={3}
              name="comment"
              id="comment"
              className="block w-full resize-none border-0 border-b border-transparent p-0 pb-2 text-gray-900 placeholder:text-gray-400 focus:border-teal-600 focus:ring-0 sm:text-sm sm:leading-6"
              placeholder="Add the URL or paste the content you would like to analyze..."
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
            />
          </div>
          <div className="flex justify-between pt-2">
            <div className="flex items-center space-x-5">
              <div className="flow-root">
                <button
                  type="button"
                  className="-m-2 inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500"
                >
                  <PaperClipIcon className="h-6 w-6" aria-hidden="true" />
                  <span className="sr-only">Attach a file</span>
                </button>
              </div>
            </div>
            <div className="flex-shrink-0">
              <button
                type="submit"
                onClick={sendMessage}
                className="inline-flex items-center rounded-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
