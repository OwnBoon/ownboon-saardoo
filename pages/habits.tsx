import React, { useEffect } from 'react';
import ExplorePages from '../components/Layout/ExplorePages';

const habit = () => {
    
    return (
        <ExplorePages section={
            {
            title: "Habits",
            about:
                "Discover curated self-improvement content and essential tools in one place, accompanied by a motivating playlist.",
            featureheading: [
                "Extensive Research & Analysis",
                "Personalized Roadmaps",
                "Tailored Community",
            ],
            featureparagraph: [
                "Explore comprehensive content tailored to each habit, providing valuable insights and guidance.",
                "Receive AI-generated personalized roadmaps for self-improvement, guiding you towards your best self.",
                "Connect with like-minded individuals, find study and gym buddies, and engage in focused group chats.",
            ],
          }
        }></ExplorePages>
    );
};

export default habit;