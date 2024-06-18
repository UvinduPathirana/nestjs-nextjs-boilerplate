"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import avatarimage from "@/public/avatar.jpg"

export default function Profile() {

    function handleLogout() {
        fetch("/api/auth/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(response => {
          if (response.ok) {
            console.log('Logged out successfully');
            //redirect to signin page
            window.location.href = '/signin';
            // Add any additional logic needed after logout, e.g., redirecting the user
          } else {
            console.error('Failed to log out');
          }
        })
        .catch(error => {
          console.error('An error occurred:', error);
        });
      }
      
      
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="overflow-hidden rounded-full"
                >
                    <Image
                        src={avatarimage.src}
                        width={36}
                        height={36}
                        alt="Avatar"
                        className="overflow-hidden rounded-full"
                    />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}