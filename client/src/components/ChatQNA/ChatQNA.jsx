import React, { useState, useRef } from "react";
import "./ChatQNA.css";
import ChatBot from "../../assets/images/Layouts/ChatBot.png"
const ChatQnA = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);
  const [selectedSubQuestion, setSelectedSubQuestion] = useState(null);
  const [isTyping, setIsTyping] = useState(false); // New state for typing status
  const chatRef = useRef(null);
  const answerRef = useRef(null);

  // Toggle the popup visibility
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  // Close the popup when clicking outside
  const handleClickOutside = (event) => {
    if (chatRef.current && !chatRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  // Attach event listener for outside click
  React.useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Predefined questions with sub-questions
  const questionBank = [
    {
        id: 1,
        question: "What is Auction X?",
        subQuestions: [
          {
            id: "1a",
            question: "What does Auction X offer?",
            answer: "Auction X offers an online bidding platform for sellers and buyers.",
          },
          {
            id: "1b",
            question: "Who can use Auction X?",
            answer: "Anyone who wants to buy or sell products via auctions can use Auction X.",
          },
        ],
      },
      {
        id: 2,
        question: "How does bidding work?",
        subQuestions: [
          { id: "2a", question: "What is the minimum bid?", answer: "The minimum bid is set by the seller for each item." },
          { id: "2b", question: "Can I withdraw my bid?", answer: "No, once placed, a bid cannot be withdrawn." },
        ],
      },
      {
        id: 3,
        question: "How can I create an account?",
        subQuestions: [
          { id: "3a", question: "Is account creation free?", answer: "Yes, creating an account on Auction X is free." },
          { id: "3b", question: "What details are required?", answer: "You need an email, phone number, and password to create an account." },
        ],
      },
      {
        id: 4,
        question: "How to add money?",
        subQuestions: [
          { id: "4a", question: "What are the payment methods?", answer: "You can add money using credit cards, debit cards, UPI, or net banking." },
          { id: "4b", question: "Is there a minimum deposit?", answer: "Yes, the minimum deposit is $10 to activate your wallet." },
          { id: "4c", question: "Are there any fees?", answer: "No, there are no additional fees for adding money." },
        ],
      },
      {
        id: 5,
        question: "What are the types of login?",
        subQuestions: [
          { id: "5a", question: "How does normal login work?", answer: "You can log in using your registered email and password." },
          { id: "5b", question: "How does Google login work?", answer: "Click on 'Login with Google,' and sign in using your Google account." },
          { id: "5c", question: "Can I switch between login types?", answer: "Yes, you can log in with either type as long as your email matches." },
        ],
      },
    ];
  

  // Handle main question selection
  const handleQuestionClick = (id) => {
    setSelectedQuestionId(selectedQuestionId === id ? null : id);
    setSelectedSubQuestion(null); // Reset sub-question selection
    setIsTyping(false); // Reset typing state
  };

  // Handle sub-question selection
  const handleSubQuestionClick = (subQuestion) => {
    setSelectedSubQuestion(null); // Reset selected sub-question
    setIsTyping(true); // Show typing state

    setTimeout(() => {
      setSelectedSubQuestion(subQuestion);
      setIsTyping(false); // Hide typing state
      setTimeout(() => {
        answerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100); // Smooth scroll to the answer
    }, 1500); // Delay to simulate typing
  };

  return (
    <div>
      {/* Button to toggle chat popup */}
      <button className="open-chat-button" onClick={togglePopup}>
      <img src={ChatBot} alt="ChatBot" style={{ width: '60px', height: '60px' }} />
      </button>

      {/* Chat popup */}
      {isOpen && (
        <div className="chat-popup" ref={chatRef}>
          <div className="chat-container">
            {/* Chat header */}
            <div className="chat-header">
              <h2>Auction X chat</h2>
              <span>get help 24X7</span>
            </div>

            {/* Chat body */}
            <div className="chat-body">
              {/* Display typing state or selected sub-question answer */}
              {isTyping ? (
                <div className="chat-message typing-indicator">
                  <p>Typing...</p>
                </div>
              ) : (
                selectedSubQuestion && (
                  <div className="chat-message" ref={answerRef}>
                    <p className="user-question">Q: {selectedSubQuestion.question}</p>
                    <p className="bot-answer">A: {selectedSubQuestion.answer}</p>
                  </div>
                )
              )}

              {/* Main question list */}
              <div className="chat-options">
                {questionBank.map((mainQuestion) => (
                  <div key={mainQuestion.id}>
                    <button
                      className="chat-option main-question"
                      onClick={() => handleQuestionClick(mainQuestion.id)}
                    >
                      {mainQuestion.question}
                    </button>

                    {/* Sub-questions for the selected main question */}
                    {selectedQuestionId === mainQuestion.id && (
                      <div className="sub-questions">
                        {mainQuestion.subQuestions.map((subQuestion) => (
                          <button
                            key={subQuestion.id}
                            className="chat-option sub-question"
                            onClick={() => handleSubQuestionClick(subQuestion)}
                          >
                            {subQuestion.question}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatQnA;
