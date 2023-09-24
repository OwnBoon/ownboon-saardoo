import { useEffect } from "react";
import prisma from "../../lib/db";

const SetupPage = () => {

    useEffect(() => { 
        async function fetchData() {
            try {
                //@ts-ignore
                // const users = await prisma.profile.findFirst();

                console.log(prisma);

            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, []);

    
    
    return <h1>working</h1>

};

export default SetupPage;
