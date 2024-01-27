import React, { useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { useSession } from 'next-auth/react';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Radio, RadioGroup,
        Select, SelectItem} from "@nextui-org/react";
import styles from "../styles/loginmodal.module.css";

const TDEEModal = () => {
    const router = useRouter();
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const [formData, setFormData] = useState({
        gender: '',
        age: '',
        weight: '',
        height: "",
        activity: '',
        body_fat: '',
      });
        
      // logic to generate the height options dynamically
      const minHeight = 4; // minimum height in feet
      const maxHeight = 7; // maximum height in feet
      const heightOptions = [];
      for (let feet = minHeight; feet <= maxHeight; feet++) {
        for (let inches = 0; inches <= 11; inches++) {
          // height should be between 4'7" and 7'3"
          if ( (feet === 4 && inches <= 6) || (feet === 7 && inches >= 4)) {
            continue;
          }
          const optionValue = `${feet}'${inches}`;
          const optionLabel = `${feet}'ft ${inches}in`;
          heightOptions.push(
            {label: optionLabel, value: optionValue}
            // <option key={optionValue} value={optionValue}>{optionLabel}</option>
          );
        }
      }
    
      const handleFormSubmit = (event) => {
        event.preventDefault();
        // redirect to TDEEPage and pass form data as query parameters
        router.push({
          pathname: '/TDEEPage',
          query: formData,
        });
      };
    
      const handleInputChange = (event) => {
        const { name, value } = event.target;
        console.log("event target: ", event.target);
        console.log("input change: ", formData);
        // create a shallowcopy of 'prevData', so that the new state object
        // retains any existing form data properties and only updates the specific field being changed
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
        console.log("after change: ", formData);
      }

    return (
        <div>
            <Button onPress={onOpen} variant="ghost">TDEE Calculator</Button>
            <Modal 
            isOpen={isOpen} 
            onOpenChange={onOpenChange}
            >
                <ModalContent>
                {(onClose) => (
                    <>
                    <ModalHeader className={styles.modal_header}>Calculate Your TDEE</ModalHeader>
                    <ModalBody>
                        <form
                            onSubmit={handleFormSubmit}>

                            {/* Gender Input */}
                            <div className="mb-3">
                                <Select
                                    isRequired
                                    label="Gender"
                                    name="gender" 
                                    id="gender"
                                    value={formData.gender}
                                    onChange={handleInputChange}
                                >
                                    <SelectItem value="Male" key="Male" onChange={handleInputChange}> Male </SelectItem>
                                    <SelectItem value="Female" key="Female" onChange={handleInputChange}> Female </SelectItem>
                                </Select>
                            </div>

                            {/* Age Input */}
                            <div className="mb-3">
                            <Input
                                isRequired
                                label="Age"
                                type="number"
                                name="age"
                                min="13"
                                max="100"
                                value={formData.age}
                                onChange={handleInputChange}
                            />
                            </div>

                            {/* Weight Input */}
                            <div className="mb-3">
                            <Input
                                isRequired
                                label="Weight"
                                type="number"
                                name="weight"
                                placeholder="Lbs"
                                min="50"
                                max="450"
                                value={formData.weight}
                                onChange={handleInputChange}
                            />
                            </div>

                            {/* Height Input */}
                            <div className="mb-3">
                            <Select 
                                isRequired
                                label="Height"
                                name="height" 
                                id="height" 
                                onChange={handleInputChange} 
                                items={heightOptions}
                            >
                                { (heightOption) => <SelectItem key={heightOption.value}> {heightOption.label} </SelectItem>}
                            </Select>
                            </div>

                            {/* Activity Input */}
                            <div className="mb-3">
                            <Select
                                isRequired
                                label="Activity"
                                name="activity" 
                                id="form_activity"
                                // value={formData.activity}
                                onChange={handleInputChange}
                            >
                                <SelectItem value="sedentary" key="sedentary" >Sedentary (Office Job) </SelectItem>
                                <SelectItem value="light" key="light">Light Exercise (1-2 Days/Week) </SelectItem>
                                <SelectItem value="moderate" key="moderate">Moderate Exercise (3-5 Days/Week) </SelectItem>
                                <SelectItem value="heavy" key="heavy">Heavy Exercise (6-7 Days/Week) </SelectItem>
                                <SelectItem value="athlete" key="athlete">Athlete (2x Per Day) </SelectItem>
                            </Select>
                            </div>

                            {/* Body Fat Input */}
                            <div className="mb-3">
                            <Input
                                type="number"
                                label="Body Fat %"
                                name="body_fat"
                                placeholder="Optional"
                                min="2"
                                max="50"
                                value={formData.body_fat}
                                onChange={handleInputChange}
                            />
                            </div>

                            {/* Upload Button */}
                            <div className="mb-3 text-center">
                            <button className="btn btn-secondary btn-sm" 
                                >Calculate</button>
                            </div>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                    </ModalFooter>
                    </>
                )}
                </ModalContent>
            </Modal>
        </div>
    )
}

export default TDEEModal;