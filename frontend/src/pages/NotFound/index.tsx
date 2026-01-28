import {useToast} from "../../components/organisms/Toast";
import {useEffect} from "react";

const NotFound = () => {
    const { showToast } = useToast();

    useEffect(() => {
        showToast({
            type: "success",
            message: "Test Toaster, Look How To Use It in Not Found Page"
        })
    }, []);

    return ( <p>Page not found</p> )
};

export default NotFound;