"use client";
import { useMutation } from 'convex/react';
import { useForm } from 'react-hook-form';
import { saveSketch } from '../../convex/sketches';
import { ReactSketchCanvas,ReactSketchCanvasRef } from 'react-sketch-canvas';
import { useRef } from 'react';

export default function Home() {

  const saveSketchMutation = useMutation("sketches:saveSketch")
  const { register, handleSubmit, watch, formState: { errors } } = useForm<{prompt:string;}>();
  const canvasRef = useRef<ReactSketchCanvasRef>(null);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <form className='flex flex-col gap-2' onSubmit={handleSubmit(async(formData)=>{
      console.log(formData);
      if(!canvasRef.current)return ;
      const image=await canvasRef.current?.exportImage("jpeg")
      console.log("image",image);
      const result = await saveSketchMutation({...formData,image});
      // console.log(result);
    })}>
      <input className='text-black' {...register("prompt",{ required: true })} />
      {errors.prompt && <span>This field is required</span>}
      <ReactSketchCanvas
      ref={canvasRef}
      style={{width:256,height:256}}
      strokeWidth={4}
      strokeColor="black"
    />
      <input className='bg-blue-400 rounded' type="submit" />
    </form>
    </main>
  )
}
