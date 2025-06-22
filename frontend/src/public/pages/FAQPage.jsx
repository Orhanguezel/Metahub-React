// src/pages/FAQPage.jsx
import React, { useState } from "react";
import styled from "styled-components";

const FAQAccordion = ({ items }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Accordion>
      {items.map((item, index) => (
        <AccordionItem key={index}>
          <AccordionHeader
            onClick={() => handleToggle(index)}
            aria-expanded={openIndex === index}
          >
            {item.question}
            <AccordionIcon $isOpen={openIndex === index}>+</AccordionIcon>
          </AccordionHeader>
          <AccordionContent $isOpen={openIndex === index}>
            <p>{item.answer}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

const FAQPage = () => {
  const faqData = [
    {
      question: "What types of bikes do you offer?",
      answer:
        "We offer a wide range of bikes including Gravel, Mountain (MTB), Racing, City, and E-Bikes. Each category is designed to meet specific needs, from off-road adventures to daily urban commutes.",
    },
    {
      question: "How do I choose the right bike size?",
      answer:
        "Choosing the right size is crucial for comfort and performance. On each bike's detail page, you will find a size selection option. If you are unsure, please refer to our general size guide or contact our support team with your height and inseam measurements.",
    },
    {
      question: "What is your shipping policy?",
      answer:
        "We offer free shipping on all orders within Europe. Orders are typically processed within 1-2 business days and delivered within 3-5 business days. You will receive a tracking number once your order has been dispatched.",
    },
    {
      question: "What is your return policy?",
      answer:
        "We offer a 30-day return policy on all our bikes. If you are not satisfied with your purchase, you can return it for a full refund or exchange, provided the bike is in its original, unused condition. Please see our Shipping & Returns page for more details.",
    },
    {
      question: "Do the bikes come assembled?",
      answer:
        "Our bikes are shipped approximately 90% assembled. You will need to perform some final assembly steps, such as attaching the front wheel, handlebars, pedals, and seatpost. We provide detailed instructions and tools, but we recommend having the bike checked by a professional mechanic before your first ride.",
    },
  ];

  return (
    <PageWrapper>
      <MainContent>
        <Title>Frequently Asked Questions</Title>
        <FAQAccordion items={faqData} />
      </MainContent>
    </PageWrapper>
  );
};

export default FAQPage;

// --- Styled Components ---

const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.grey || "#f0f0f0"};
`;

const MainContent = styled.main`
  flex-grow: 1;
  width: 100%;
  max-width: 900px; /* Nieco węższy layout dla lepszej czytelności FAQ */
  margin: 0 auto;
  padding: 120px 2rem 4rem;
  color: ${({ theme }) => theme.colors.black || "#000"};
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 2.5rem;
  text-align: center;
`;

const Accordion = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const AccordionItem = styled.div`
  background-color: ${({ theme }) => theme.colors.white || "#fff"};
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  overflow: hidden;
`;

const AccordionHeader = styled.button`
  width: 100%;
  background-color: transparent;
  border: none;
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  text-align: left;
  font-family: inherit;
  font-size: 1.1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.black || "#000"};

  &:hover {
    background-color: #f9f9f9;
  }
`;

const AccordionIcon = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
  transition: transform 0.3s ease;
  transform: ${({ $isOpen }) => ($isOpen ? "rotate(45deg)" : "rotate(0deg)")};
`;

const AccordionContent = styled.div`
  max-height: ${(props) =>
    props.$isOpen ? "1000px" : "0"}; /* Animacja wysokości */
  overflow: hidden;
  transition: max-height 0.4s ease-in-out;

  p {
    padding: 0 1.5rem 1.5rem;
    margin: 0;
    line-height: 1.7;
    color: ${({ theme }) => theme.colors.darkGrey || "#555"};
  }
`;
