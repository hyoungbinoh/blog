import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import useToast from "../hooks/toast";

const ShowPage = () => {
    const {id} = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const {addToast} = useToast();
    const [error, setError] = useState('');

    const getPost = (id) => {
        axios.get(`http://localhost:3001/posts/${id}`).then((res) => {
            setPost(res.data);
            setLoading(false);
        }).catch(e => {
            setError('Something went wrong in db.');
            addToast({
                type:'danger',
                text: 'Something went wrong in db.'
            })
            setLoading(false);
        })
    };

    useEffect(() => {
        getPost(id)
    }, [id])

    const printDate = (timestemp) => {
        return new Date(timestemp).toLocaleString();
    }

    if (loading) {
        return <LoadingSpinner />
    }

    if (error) {
        return (<div>{error}</div>)
    }

    return (
        <div>
            <div className="d-flex">
                <h1 className="flex-grow-1">{post.title}</h1>
                {isLoggedIn && <div>
                <Link 
                className="btn btn-primary"
                to={`/blogs/${id}/edit`}
                >
                    Edit
                </Link>
                </div>}
            </div>
            <small className="text-muted">
                Created At: {printDate(post.createdAt)}
            </small>
            <hr />
            <p>{post.body}</p>
        </div>
    );
}

export default ShowPage