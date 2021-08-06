import { useForm } from "react-hook-form";


export const Form = ({ cityName, setCityName }) => {
    const { register, handleSubmit } = useForm();

    const handleData = (data) => {
        console.log(data)
        setCityName(data.name);
    }

    return (
        <form onSubmit={handleSubmit(handleData)}>
            <label>City:</label>
            <br />
            <input name="name" type="text" {...register('name', { required: true, maxLength: 255 })} />
            <button type="submit">Search</button>
        </form>
    )
}