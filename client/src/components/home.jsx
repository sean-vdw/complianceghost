import React from 'react';
import { Fragment, useState } from 'react'
import { FaceSmileIcon as FaceSmileIconOutline, PaperClipIcon } from '@heroicons/react/24/outline'
import loadingSpinner from '../assets/load-spinner.svg';
import axios from 'axios';

// Google Gemini Variables and Dependencies
const API_KEY = process.env.REACT_APP_API_KEY;
const { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(API_KEY);

// Formatting Text Function
function formatText(text) {
  // Split the text into paragraphs
  const paragraphs = text.split('\n\n');

  // Format each paragraph
  const formattedParagraphs = paragraphs.map((paragraph, index) => {
    // Split the paragraph into sentences
    const sentences = paragraph.split('.');

    // Format each sentence
    const formattedSentences = sentences.map((sentence, sentenceIndex) => {
      // Remove leading/trailing whitespace
      const trimmedSentence = sentence.trim();

      // Add a period to the end of the sentence if it's missing
      const sentenceWithPeriod = trimmedSentence.endsWith('.') ? trimmedSentence : `${trimmedSentence}.`;

      // Capitalize the first letter of the sentence
      let formattedSentence = `${sentenceWithPeriod[0].toUpperCase()}${sentenceWithPeriod.slice(1)}`;

      // Bold the text between ** and **
      formattedSentence = formattedSentence.replace(/\*\*(.*?)\*\*/g, (match, p1) => `<strong>${p1}</strong>`);

      // Replace * with unordered list items
      formattedSentence = formattedSentence.replace(/\*/g, '- ');

      // Remove periods after colons
      formattedSentence = formattedSentence.replace(/:\./g, ':');

      // Remove the - - before and after the numbered lines
      formattedSentence = formattedSentence.replace(/- (\d+\. )- /g, '$1');

      return (
        <span key={`sentence-${sentenceIndex}`}
          dangerouslySetInnerHTML={{ __html: formattedSentence }}
        />
      );
    });

    // Create a header from the text following "Potential Regulatory Risks in Provided Marketing Content"
    const headerMatch = paragraph.match(/Potential Regulatory Risks in Provided Marketing Content/);
    const header = headerMatch ? <h1 key={`header-${index}`}>Potential Regulatory Risks in Provided Marketing Content</h1> : null;

    return (
      <React.Fragment key={`paragraph-${index}`}>
        <p>
          {formattedSentences}
        </p>
        <br />
      </React.Fragment>
    );
  });

  return formattedParagraphs;
}


export default function Home() {
  const [userMessage, setUserMessage] = useState('');
  const [aiResponse, setAiResponse] = useState(''); 
  const [loading, setLoading] = useState(false);
  const formattedText = formatText(aiResponse);

  const fullPrompt = `input: You are the leading compliance consultant for RIAs, Wealth Management firms, and broker dealers. These companies pay you top dollar in order to identify potential regulatory risks associated with marketing content that may be delivered as text, audio, and image content marketing. For a piece of content provided, which may be text, audio, or image, provided via a URL, pdf, word file, video file, or text written following this preliminary prompt instruction, identify any language that may be in violation of any SEC or other regulator rules surrounding marketing content. Please identify the specific language that may be in violation of marketing laws, and alternative language that would not violate those same rules. If necessary, create a disclaimer that would allow the content to remain in the marketing piece as-is. Finally, be sure to identify which rules this may be in violation of, or potentially in conflict with. Included is the content that I would like you to review, analyze, and suggest changes for: ${userMessage}`;

  const generationConfig = {
    temperature: 1.0,
    topP: 1,
    topK: 1,
  };
  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  const sendMessage = async () => {
    setLoading(true);
    try {
      const model = await genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });
      const result = await model.generateContent(fullPrompt, generationConfig, safetySettings);
      const response = await result.response.text();
      console.log(response);
      setAiResponse(response);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }

  return (
    <>
      <div className='bg-white max-w-7xl mx-auto mb-64 text-left'>
        <div className='leading-relaxed mt-6 mb-24'>
          <h1 className='font-semibold text-md text-cyan-900 bg-cyan-50 py-3 px-2 rounded-3xl text-center max-w-xl mx-auto mb-4'>Potential Regulatory Risks in Provided Marketing Content</h1>
          <div className='border-solid border-[0.75px] border-slate-200 rounded-lg px-8 py-10'>
            {formattedText}
          </div>
        </div>
      </div>
      <div className='bg-white fixed bottom-6 left-0 right-0 max-w-3xl mx-auto border-solid border-2 border-slate-100 rounded-xl drop-shadow-2xl'>
        <div className="flex items-start space-x-4 px-8 py-5">
          <div className="min-w-0 flex-1">
            <form action="#" onSubmit={(e) => { e.preventDefault(); sendMessage(); }}>
              <div className="border-b border-gray-200 focus-within:border-teal-600">
                <label htmlFor="comment" className="sr-only">
                  Add the URL or paste the content you would like to analyze...
                </label>
                <textarea
                  rows={4}
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
                    onSubmit={(e) => { e.preventDefault(); sendMessage(); }}
                    className={`${loading ? 'hidden' : 'inline-flex items-center rounded-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600'}`}
                  >
                    Submit
                  </button>
                  <img src={loadingSpinner} className={`mx-auto ${loading ? 'block animate-spin size-9' : 'hidden'}`} alt='loading spinner' />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
