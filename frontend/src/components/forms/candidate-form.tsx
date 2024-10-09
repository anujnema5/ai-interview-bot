import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail } from 'lucide-react';
import Heading from '../ui/heading';
import Description from '../ui/description';
import { interviewFormSchema } from "@/utils/schema";
import { useStore } from "@/store";
import { useApi } from "@/hooks";
import { useLocation, useNavigate } from 'react-router-dom';
import { Alert } from "../custom-ui";

export default function CandidateForm() {
    const { uploadResumeMutation: { mutate: resumeMutate, isPending } } = useApi();
    const { user, resetSteps } = useStore();
    const location = useLocation();
    const navigate = useNavigate()
    const [resume, setResume] = useState(null);

    const prefilledData = location.state?.user || user;

    const form = useForm<z.infer<typeof interviewFormSchema>>({
        resolver: zodResolver(interviewFormSchema),
        defaultValues: {
            firstName: prefilledData.firstName || "",
            lastName: prefilledData.lastName || "",
            email: prefilledData.email || "",
            jobTitle: prefilledData.job_role || "",
            experience: prefilledData.experience_level || "",
        },
    });

    function onSubmit() {
        if (!resume) {
            toast.warning('Please upload resume to continue')
        } else {
            resumeMutate({ userId: user?.userId, file: resume });
        }
    }

    const handleFileChange = (e: React.ChangeEvent<any>) => {
        const file = e.target.files[0];
        if (file) {
            setResume(file);
        }
    };

    const handleCancel = () => {
        resetSteps()
        navigate(`/invitation/${user?.userId}`)
    }

    return (
        <>
            {/* <Alert open={alertDialog} close={setAlertDialog} description="asdasd" /> */}
            <div className="w-full mx-auto pt-8 bg-white">
                <div className="flex flex-col gap-1 divide-transparent">
                    <Heading type='h3' className='font-bold'>Please verify these fields</Heading>
                    <Description variant='span'>Click on the submit below once done</Description>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-8 p-1">
                        {/* Full Name */}
                        <div className="grid grid-cols-4 gap-4 items-center">
                            <FormLabel className="">Full Name
                                <span className='text-danger'>&nbsp;*</span>
                            </FormLabel>
                            <div className="col-span-3 grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="firstName"
                                    render={({ field }) => (
                                        <FormControl>
                                            <Input
                                                placeholder="First Name"
                                                {...field}
                                                className="h-12"
                                                disabled={!!prefilledData.firstName} // Disable if prefilled
                                            />
                                        </FormControl>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="lastName"
                                    render={({ field }) => (
                                        <FormControl>
                                            <Input
                                                placeholder="Last Name"
                                                {...field}
                                                className="h-12"
                                                disabled={!!prefilledData.lastName} // Disable if prefilled
                                            />
                                        </FormControl>
                                    )}
                                />
                            </div>
                        </div>

                        {/* Email Address */}
                        <div className="grid grid-cols-4 gap-4 items-center">
                            <FormLabel className="">Email address
                                <span className='text-danger'>&nbsp;*</span>
                            </FormLabel>
                            <div className="col-span-3">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormControl>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                                <Input
                                                    type="email"
                                                    {...field}
                                                    className="pl-10 h-12"
                                                    disabled={!!prefilledData.email} // Disable if prefilled
                                                />
                                            </div>
                                        </FormControl>
                                    )}
                                />
                            </div>
                        </div>

                        {/* Upload Resume */}
                        <div className="grid grid-cols-4 gap-4 items-start">
                            <div className="divide-y-4 divide-transparent">
                                <FormLabel className=" pt-2">Upload Resume
                                    <span className='text-danger'>&nbsp;*</span>
                                </FormLabel>
                                <Description variant="p" className="text-xs">This data will be extracted, so use a readable document</Description>
                            </div>
                            <div className="col-span-3">
                                <FormField
                                    control={form.control}
                                    name="resume"
                                    render={() => (
                                        <FormControl>
                                            <div className="border border-gray-300 rounded-lg p-6 text-center cursor-pointer">
                                                <input
                                                    type="file"
                                                    accept=".pdf,.doc,.docx" // Limit file types
                                                    onChange={(e) => handleFileChange(e)} // Handle file change
                                                />
                                            </div>
                                        </FormControl>
                                    )}
                                />
                            </div>
                        </div>

                        {/* Job Title */}
                        <div className="grid grid-cols-4 gap-4 items-center">
                            <FormLabel className="">Job Title
                                <span className='text-danger'>&nbsp;*</span></FormLabel>
                            <div className="col-span-3">
                                <FormField
                                    control={form.control}
                                    name="jobTitle"
                                    render={({ field }) => (
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={prefilledData.job_role || field.value}
                                            disabled={!!prefilledData.job_role} // Disable if prefilled
                                        >
                                            <FormControl>
                                                <SelectTrigger className="h-12">
                                                    <SelectValue placeholder="Select a job title" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value={user?.job_role}>
                                                    {user?.job_role}
                                                </SelectItem>
                                                {/* <SelectItem value="Senior UX/UI Designer">Senior UX/UI Designer</SelectItem> */}
                                                {/* Add more job titles as needed */}
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                            </div>
                        </div>

                        {/* Experience Level */}
                        <div className="grid grid-cols-4 gap-4 items-center">
                            <FormLabel className="">Experience Level
                                <span className='text-danger'>&nbsp;*</span>
                            </FormLabel>
                            <div className="col-span-3">
                                <FormField
                                    control={form.control}
                                    name="experience"
                                    render={({ field }) => (
                                        <Select
                                            value={field.value || prefilledData.experience_level || ""} // Use value prop directly
                                            onValueChange={field.onChange} // Update on change
                                            disabled={!!prefilledData.experience_level} // Disable if prefilled
                                        >
                                            <FormControl>
                                                <SelectTrigger className="h-12">
                                                    <SelectValue placeholder="Select experience level" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="Entry Level">Entry Level (0-1 Years)</SelectItem>
                                                <SelectItem value="Mid Level">Mid Level (2-5 Years)</SelectItem>
                                                <SelectItem value="Senoir Level">Senior Level (5+ Years)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                            </div>
                        </div>


                        <div className="flex space-x-4 mt-8">
                            <Button
                                onClick={handleCancel}
                                type="button"
                                variant="outline"
                                className="flex-1 rounded-sm h-12">
                                Cancel
                            </Button>

                            <Button
                                onClick={onSubmit}
                                disabled={!form.formState || isPending}
                                type="submit"
                                className="flex-1 rounded-sm h-12 bg-primary hover:bg-teal-700">
                                {isPending ? "Please wait ..." : "Let's start"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </>
    );
}
