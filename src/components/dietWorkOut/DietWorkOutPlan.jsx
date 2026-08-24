import React, { useEffect, useState } from "react";
import { Tabs, Collapse, Tag, Button, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import { dietWorkOutPlanAsync } from "../../feature/dietWorkoutSlice";
import Loader from "../../loader/Loader";
const DietWorkOutPlan = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
    const {user,dietPlan,workOutPlan}=useSelector(state=>state.diet);
    const {isLoading}=useSelector(state=>state.diet)
    const [speech,setSpeech]=useState(false)
const generatePDF = () => {
  const doc = new jsPDF();

  let y = 20;

  doc.setFontSize(20);
  doc.text("Personalized Fitness Plan", 20, y);

  y += 15;

  doc.setFontSize(12);
  doc.text(`Name: ${user.name}`, 20, y);

  y += 8;
  doc.text(`Goal: ${user.goal}`, 20, y);

  y += 15;

  doc.setFontSize(16);
  doc.text("Workout Plan", 20, y);

  y += 10;

  doc.setFontSize(12);

  workOutPlan.forEach((workout, index) => {
    doc.text(`${index + 1}. ${workout?.title}`, 25, y);
    y += 8;
  });

  y += 10;

  doc.setFontSize(16);
  doc.text("Diet Plan", 20, y);

  y += 10;

  doc.setFontSize(12);

  dietPlan.forEach((meal, index) => {
    doc.text(`${index + 1}. ${meal?.title}`, 25, y);
    y += 8;
  });

  doc.save("my-fitness-plan.pdf");
};

const regenerateHandler=async()=>{
   try {
          const data={
            name:user.name,
            age:user.age,
            fitnessGoal:user.goal,
            fitnessLevel:user.level,
            workoutLocation:user.location
          };
          const res=await dispatch(dietWorkOutPlanAsync({data})).unwrap();
          if(res.success){
              navigate("/diet-workout")
          }
          
       } catch (error) {
          console.log(error);
          
       }
}

const speakText = (text) => {
  console.log(text, "text to speak");

  if (!text || !String(text).trim()) {
    console.log("No text to read");
    setSpeech(false);
    return;
  }

  // Stop previous speech
  window.speechSynthesis.cancel();
  setSpeech(true);

  const voices = window.speechSynthesis.getVoices();

  const voice =
    voices.find(
      (v) =>
        v.lang === "en-US" &&
        /Samantha|Google US English|Microsoft Zira/i.test(v.name)
    ) ||
    voices.find((v) => v.lang === "en-US") ||
    voices.find((v) => v.lang.startsWith("en"));

  const utterance = new SpeechSynthesisUtterance(String(text));

  if (voice) {
    utterance.voice = voice;
    utterance.lang = voice.lang;
  } else {
    utterance.lang = "en-US";
  }

  utterance.rate = 0.85;
  utterance.pitch = 1.1;
  utterance.volume = 1;

  utterance.onstart = () => {
    console.log("Speech started");
    setSpeech(true);
  };

  utterance.onend = () => {
    console.log("Speech ended");
    setSpeech(false);
  };

  utterance.onerror = (error) => {
    console.log("Speech error:", error);
    setSpeech(false);
  };

  window.speechSynthesis.speak(utterance);
};
console.log(dietPlan);
const stopListen=()=>{
  window.speechSynthesis.cancel();
}
const readWorkOutPlan=()=>{
  const text = workOutPlan
    .map(
      (item) =>
        ` ${item.title}. `
    )
    .join(". ");

   speakText(text);
}
  const dietItems = dietPlan?.map((day) => ({
    key: day.day,
    label: (
      <div className="flex items-center justify-between pr-4">
        <span className="font-semibold text-gray-800">
          {day.title}
        </span>
        <Tag color="green">
          {day.meals.length} Meals
        </Tag>
      </div>
    ),
    children: (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {day.meals.map((meal, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-xl border border-gray-200 bg-white"
          >
            <div className="p-4">
              <p className="mb-1 text-sm font-medium text-blue-600">
                {meal.meal}
              </p>

              <h3 className="text-lg font-semibold text-gray-800">
                {meal.name}
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                {meal.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    ),
  }));

  const workoutItems = workOutPlan?.map((day) => ({
    key: day.day,
    label: (
      <div className="flex items-center justify-between pr-4">
        <span className="font-semibold text-gray-800">
          {day.title}
        </span>

        <Tag color="blue">
          {day.exercises.length} Exercises
        </Tag>
      </div>
    ),
    children: (
      <div className="space-y-4">
        {day.exercises.map((exercise, index) => (
          <div
            key={index}
            className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 sm:flex-row"
          >

            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800">
                {exercise.name}
              </h3>

              <div className="mt-3 flex flex-wrap gap-2">
                <Tag color="blue">
                  Sets: {exercise.sets}
                </Tag>

                <Tag color="green">
                  Reps: {exercise.reps}
                </Tag>

                <Tag color="orange">
                  Rest: {exercise.rest}
                </Tag>
              </div>

              <p className="mt-3 text-sm text-gray-500">
                {exercise.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    ),
  }));

  const tabItems = [
    {
      key: "diet",
      label: "🥗 Diet Plan",
      children: (
        <Collapse
          items={dietItems}
          accordion
          className="!bg-white"
        />
      ),
    },
    {
      key: "workout",
      label: "💪 Workout Plan",
      children: (
        <Collapse
          items={workoutItems}
          accordion
          className="!bg-white"
        />
      ),
    },
  ];

useEffect(()=>{
  if(!dietPlan.length || !workOutPlan.length){
    navigate("/")
  } 
},[]);
if(isLoading) return <Loader/>

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            My Fitness Plan
          </h1>

          <p className="mt-1 text-gray-500">
            Your personalized diet and workout plan
          </p>
        </div>

        {/* User Information */}
        <div className="mb-8 rounded-2xl bg-white p-6 shadow-sm">
          <div className="mb-5">
            <h2 className="text-xl font-semibold text-gray-800">
              Personal Information
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">

            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="mt-1 font-semibold text-gray-800">
                {user.name}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Age</p>
              <p className="mt-1 font-semibold text-gray-800">
                {user.age} Years
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Goal</p>
              <Tag color="red" className="mt-1">
                {user.goal}
              </Tag>
            </div>

            <div>
              <p className="text-sm text-gray-500">Fitness Level</p>
              <Tag color="blue" className="mt-1">
                {user.level}
              </Tag>
            </div>

            <div>
              <p className="text-sm text-gray-500">Workout Location</p>
              <p className="mt-1 font-semibold capitalize text-gray-800">
                {user.location}
              </p>
            </div>
          </div>
        </div>

        {/* Diet / Workout Tabs */}
        <div className="flex flex-wrap gap-3 pb-8 sm:justify-end">
          <Button className="!bg-[#450C3F] !text-[#fff] !rounded-full" onClick={regenerateHandler}>Regenerate</Button>
          <Button className="!bg-[#450C3F] !text-[#fff] !rounded-full" onClick={generatePDF}>Download PDF</Button>
          <Button className="!bg-[#450C3F] !text-[#fff] !rounded-full" onClick={()=>{navigate("/")}}>Ask for Others</Button>
          <Button className="!bg-[#450C3F] !text-[#fff] !rounded-full" onClick={readWorkOutPlan}>Listen Your Workout Plan</Button>
          {speech && <Button className="!bg-[#450C3F] !text-[#fff] !rounded-full" onClick={stopListen}>Stop Listen</Button>}
        </div>
        <div className="flex justify-center py-3">
         <Typography.Text className="!text-[24px]">Hii, {user.name} Your AI Plan is Ready </Typography.Text>
        </div>
        <div className="bg-[#450C3F] px-5 py-10 w-[500px] mx-auto rounded-2xl flex flex-col items-center mb-3">
         <Typography.Text className="!text-[16px] !text-[#fff]">"Every workout counts,</Typography.Text>
         <Typography.Text className="!text-[16px] !text-[#fff]">Consistency unlocks your transformation. 💪🔥"</Typography.Text>

          
        </div>
        <div className="rounded-2xl bg-white p-4 shadow-sm sm:p-6">
          <Tabs
            defaultActiveKey="diet"
            items={tabItems}
            size="large"
          />
        </div>

      </div>
    </div>
  );
};

export default DietWorkOutPlan;