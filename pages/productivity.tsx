import React from 'react';
import ExplorePages from '../components/Layout/ExplorePages';

const productivity = () => {
    return (
        <ExplorePages section={
            {
                title: "Productivity",
                about:
                    "Boost your productivity with AI-powered tools, task scheduling, and study techniques tailored to your goals.",
                featureheading: [
                    "The AI Powered Platform",
                    "Immersive Lofi Study Sessions",
                    "Ultimate Ecosystem",
                ],
                featureparagraph: [
                    "Leverage AI to automate task scheduling and discover optimal study techniques for efficient progress.",
                    "Immerse yourself in animated Lofi video sessions and curated playlists designed to enhance focus.",
                    "Access a comprehensive range of features including todos, journaling, notion templates, and more, all synchronized across the platform.",
                ]
            }
        }></ExplorePages>
    );
};

export default productivity;