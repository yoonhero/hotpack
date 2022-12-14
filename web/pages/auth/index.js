import { useForm } from "react-hook-form";
import {Head} from "next/head";
export default function App() {
  
  var dataset = null;
  var example_id = "minjune";
  var example_pw = "1234";
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => {
    console.log(data);
    dataset= data;

    if(dataset.id == example_id && dataset.passward == example_pw)
      alert("로그인 되었습니다");
    else
      alert("Error!!");
    
  }

  
  

  return (
    <>
    <title>HotPack!!!</title>
     <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    <h1>로그인</h1>
    <form onSubmit={handleSubmit(onSubmit)}>
      
      <div>
      <input {...register("id", { required: true })} />
      </div>
      
      <div>
      <input type={"password"}{...register("passward", {required: true})} />
      </div>
     
      {/* include validation with required or other standard HTML validation rules */}
      
      {/* errors will return when field validation fails  */}
      {errors.exampleRequired && <span>This field is required</span>}
      
      <input type="submit" value={"확인"}/>
    </form>
    </>
  );
}