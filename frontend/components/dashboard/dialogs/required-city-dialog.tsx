"use client";

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";

interface AddCityDialogProps {
  show: boolean;
  onClose: () => void;
  onAddCity: (cityName: string) => void;
}

export default function AddCityDialog({ show, onClose, onAddCity }: AddCityDialogProps) {
  const [cityName, setCityName] = useState("");

  const handleAddCity = () => {
    if (cityName.trim()) {
      onAddCity(cityName);
      setCityName("");
      onClose(); // Close the dialog after adding the city
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && cityName.trim()) {
      handleAddCity();
    }
  };

  return (
    <>
      {show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"></div>
      )}
      <AlertDialog open={show} onOpenChange={onClose}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Add City</AlertDialogTitle>
            <AlertDialogDescription>
              You need to add at least one city to use this application. Please enter a city name.
            </AlertDialogDescription>
          </AlertDialogHeader>
            <Input
              type="text"
              placeholder="Enter city name"
              value={cityName}
              onChange={(e) => setCityName(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-grow"
            />
            <AlertDialogAction onClick={handleAddCity} disabled={!cityName.trim()}>
              Add City
            </AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
