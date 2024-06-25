"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2 } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import AddCityDialog from "@/components/dashboard/dialogs/required-city-dialog";
import { useCookies } from "next-client-cookies";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type City = {
  id: string;
  city: string;
};

interface SelectCityProps {
  selectedCity: City | null;
  setSelectedCity: React.Dispatch<React.SetStateAction<City | null>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SelectCity({
  selectedCity,
  setSelectedCity,
  setLoading,
}: SelectCityProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [cities, setCities] = useState<City[]>([]);
  const [showAddCityDialog, setShowAddCityDialog] = useState<boolean>(false);
  const { toast } = useToast();
  const cookies = useCookies();

  // Flag to control the token refresh flow
  let isRefreshing = false;

  async function refreshToken() {
    const refreshToken = cookies.get("refreshToken");
    const response = await fetch("/api/refreshtoken", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });
    const data = await response.json();
    cookies.set("token", data.accessToken);
    isRefreshing = false; // Reset the flag
    redirect("/dashboard"); // Ensure this does not cause the component to re-mount
  }

  const fetchCities = async () => {
    try {
      const response = await fetch("/api/userlocation", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCities(data);

        // Set the first city as selected if no city is selected
        if (data.length > 0 && !selectedCity) {
          setSelectedCity(data[0]);
          setLoading(true);
        } else if (data.length === 0) {
          setShowAddCityDialog(true);
        }
      } else {
        console.error("Unauthorized request");
        toast({
          variant: "destructive",
          title: "Unauthorized request",
          description: "You are not authorized to perform this action.",
        });
        if (!isRefreshing) {
          // Only refresh token if it's not already refreshing
          isRefreshing = true;
          await refreshToken();
        }
      }
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  useEffect(() => {
    fetchCities();
    // Empty dependency array to run only once when component mounts
  }, []);

  useEffect(() => {
    // Ensure a city is always selected when the city list changes
    if (cities.length > 0 && !selectedCity) {
      setSelectedCity(cities[0]);
      setLoading(true);
    }
  }, [cities, selectedCity, setLoading, setSelectedCity]);

  const handleSelectChange = (value: string) => {
    const selected = cities.find((city) => city.city === value) || null;
    setSelectedCity(selected);
    setIsOpen(false);
    setLoading(true);
  };

  const handleToggleDropdown = async (isOpen: boolean) => {
    setIsOpen(isOpen);
    if (isOpen) {
      await fetchCities();
    }
  };

  const handleDeleteCity = async () => {
    if (!selectedCity) return;

    try {
      const response = await fetch(`/api/userlocation/${selectedCity.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        toast({
          variant: "destructive",
          title: "Success!",
          description: "City deleted successfully.",
        });
        fetchCities();
        setSelectedCity(null);
        if (cities.length === 1) {
          setShowAddCityDialog(true);
        }
      } else {
        console.error("Failed to delete city");
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        });
      }
    } catch (error) {
      console.error("Error deleting city:", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  };

  const handleAddCity = async (cityName: string) => {
    try {
      const response = await fetch("/api/userlocation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ city: cityName }),
      });

      if (response.ok) {
        toast({
          title: "Success!",
          description: "City added successfully.",
        });
        // Add revalidate without calling fetch cities again
        revalidatePath("/dashboard");
        setShowAddCityDialog(false);
      } else {
        console.error("Failed to add city");
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        });
      }
    } catch (error) {
      console.error("Error adding city:", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <Select
        value={selectedCity?.city || ""}
        onValueChange={handleSelectChange}
        onOpenChange={handleToggleDropdown}
      >
        <SelectTrigger id="status" aria-label="Select City">
          <SelectValue placeholder="Select City" />
        </SelectTrigger>
        <SelectContent>
          {cities.map((city) => (
            <SelectItem key={city.id} value={city.city}>
              <div className="flex items-center justify-between w-full">
                <span className="flex-grow text-left">{city.city}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            className="p-3 text-red-600 focus:outline-none rounded-md hover:bg-black"
            disabled={!selectedCity}
            variant="outline"
          >
            <Trash2 size={15} />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              selected city.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteCity}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AddCityDialog
        show={showAddCityDialog}
        onClose={() => setShowAddCityDialog(false)}
        onAddCity={handleAddCity}
      />
    </div>
  );
}
