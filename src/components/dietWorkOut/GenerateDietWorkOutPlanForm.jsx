import React from "react";
import { Form, Input, Select, Button, InputNumber } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { dietWorkOutPlanAsync } from "../../feature/dietWorkoutSlice";
import { useNavigate } from "react-router-dom";
import Loader from "../../loader/Loader";

const GenerateDietWorkOutPlanForm = () => {
  const [form] = Form.useForm();
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const {isLoading}=useSelector(state=>state.diet)
  const handleSubmit = async(values) => {
    console.log("Form Values:", values);
     try {
        const data={...values};
        const res=await dispatch(dietWorkOutPlanAsync({data})).unwrap();
        if(res.success){
            navigate("/diet-workout")
        }
        
     } catch (error) {
        console.log(error);
        
     }
  };
if(isLoading) return <Loader/>
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800">
            Generate AI Plan
          </h1>

          <p className="mt-2 text-gray-500">
            Enter your details to generate a personalized 7-day diet and
            workout plan.
          </p>
        </div>

        {/* Form Card */}
        <div className="rounded-2xl bg-white p-6 shadow-md sm:p-8">
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
          >
            <div className="grid grid-cols-1 gap-x-6 md:grid-cols-2">
              {/* Name */}
              <Form.Item
                label="Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please enter your name",
                  },
                ]}
              >
                <Input
                  size="large"
                  placeholder="Enter your Name"
                />
              </Form.Item>

              {/* Age */}
              <Form.Item
                label="Age"
                name="age"
                rules={[
                  {
                    required: true,
                    message: "Please enter your age",
                  },
                ]}
              >
                <InputNumber
                  size="large"
                  className="!w-full"
                  min={1}
                  max={100}
                  placeholder="Enter your Age"
                />
              </Form.Item>

              {/* Height */}
              <Form.Item
                label="Height"
                name="height"
                rules={[
                  {
                    required: true,
                    message: "Please enter your height",
                  },
                ]}
              >
                <Input
                  size="large"
                  placeholder="Please Enter Height in centimeter"
                />
              </Form.Item>

              {/* Weight */}
              <Form.Item
                label="Weight (kg)"
                name="weight"
                rules={[
                  {
                    required: true,
                    message: "Please enter your weight",
                  },
                ]}
              >
                <InputNumber
                  size="large"
                  className="!w-full"
                  min={1}
                  placeholder="Enter your weight in KG"
                />
              </Form.Item>

              {/* Gender */}
              <Form.Item
                label="Gender"
                name="gender"
                rules={[
                  {
                    required: true,
                    message: "Please select your gender",
                  },
                ]}
              >
                <Select
                  size="large"
                  placeholder="Select gender"
                  options={[
                    {
                      label: "Male",
                      value: "male",
                    },
                    {
                      label: "Female",
                      value: "female",
                    },
                    {
                      label: "Other",
                      value: "other",
                    },
                  ]}
                />
              </Form.Item>

              {/* Fitness Goal */}
              <Form.Item
                label="Fitness Goal"
                name="fitnessGoal"
                rules={[
                  {
                    required: true,
                    message: "Please select your fitness goal",
                  },
                ]}
              >
                <Select
                  size="large"
                  placeholder="Select fitness goal"
                  options={[
                    {
                      label: "Weight Loss",
                      value: "weight loss",
                    },
                    {
                      label: "Weight Gain",
                      value: "weight gain",
                    },
                    {
                      label: "Muscle Gain",
                      value: "muscle gain",
                    },
                    {
                      label: "Build Strength",
                      value: "build strength",
                    },
                    {
                      label: "Improve Fitness",
                      value: "improve fitness",
                    },
                    {
                      label: "Maintain Weight",
                      value: "maintain weight",
                    },
                  ]}
                />
              </Form.Item>

              {/* Fitness Level */}
              <Form.Item
                label="Fitness Level"
                name="fitnessLevel"
                rules={[
                  {
                    required: true,
                    message: "Please select your fitness level",
                  },
                ]}
              >
                <Select
                  size="large"
                  placeholder="Select fitness level"
                  options={[
                    {
                      label: "Beginner",
                      value: "beginner",
                    },
                    {
                      label: "Intermediate",
                      value: "intermediate",
                    },
                    {
                      label: "Advanced",
                      value: "advanced",
                    },
                  ]}
                />
              </Form.Item>

              {/* Workout Location */}
              <Form.Item
                label="Workout Location"
                name="workoutLocation"
                rules={[
                  {
                    required: true,
                    message: "Please select your workout location",
                  },
                ]}
              >
                <Select
                  size="large"
                  placeholder="Select workout location"
                  options={[
                    {
                      label: "Home",
                      value: "home",
                    },
                    {
                      label: "Gym",
                      value: "gym",
                    },
                    {
                      label: "Outdoor",
                      value: "outdoor",
                    },
                  ]}
                />
              </Form.Item>

              {/* Dietary Preference */}
              <Form.Item
                label="Dietary Preference"
                name="dietaryPlan"
                rules={[
                  {
                    required: true,
                    message: "Please select your dietary preference",
                  },
                ]}
              >
                <Select
                  size="large"
                  placeholder="Select dietary preference"
                  options={[
                    {
                      label: "Vegetarian",
                      value: "vegetarian",
                    },
                    {
                      label: "Non-Vegetarian",
                      value: "non-vegetarian",
                    },
                    {
                      label: "Vegan",
                      value: "vegan",
                    },
                    {
                      label: "Eggetarian",
                      value: "eggetarian",
                    },
                  ]}
                />
              </Form.Item>
            </div>

            {/* Medical History */}
            <Form.Item
              label="Medical History"
              name="medicalHistory"
              rules={[
                {
                  required: false,
                  message: "Please enter your medical history",
                },
              ]}
            >
              <Input.TextArea
                rows={4}
                placeholder="Enter any medical conditions, allergies, injuries, or write 'None'"
              />
            </Form.Item>

            {/* Button */}
            <Form.Item className="mb-0 mt-6">
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
                className="!h-12 !rounded-lg !text-base !font-semibold"
              >
                Generate AI Plan
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default GenerateDietWorkOutPlanForm;