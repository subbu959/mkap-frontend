"use client"
import React from "react"
import { AddUserForm } from "@/components/adduser-form"

export default function AdduserPage(){

    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
                    <div className="w-full max-w-lg">
                        <AddUserForm />
                    </div>
                </div>
    )
}