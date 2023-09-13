import React from 'react';
import ExplorePages from '../components/Layout/ExplorePages';

const  community = () => {
    return (
        <ExplorePages section={
            {
                title: "Community",
                about:
                  "Join a supportive community of like-minded individuals, fostering motivation, and discipline for greater progress.",
                featureheading: [
                  "Productive Media",
                  "AI Minimalism",
                  "Group Inspiration",
                ],
                featureparagraph: [
                  "Engage in content solely focused on self-improvement and productivity, eliminating distractions.",
                  "Experience distraction-free sessions with AI-imposed time limits on chatting and scrolling.",
                  "Create and join group chats focused on specific topics, fostering inspiration and growth together.",
                ],
              }
        }></ExplorePages>
    );
};

export default community;