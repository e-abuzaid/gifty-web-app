"use client";

import { getPerson, updatePerson, uploadImage } from "@/api";
import { useAuth } from "@/context/AuthContext";
import { Person } from "@/types/types";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Female from "@/assets/female-placeholder.png";
import Male from "@/assets/male-placeholder.png";
import Image from "next/image";
import { ChevronLeft, Edit2Icon, Trash2Icon, UploadCloud } from "lucide-react";
import Link from "next/link";
import { Input, inputVariants } from "@/components/ui/Input";
import { genders, relationships } from "@/config";
import { Button } from "@/components/ui/Button";
import Loader from "@/components/ui/Loader";

type Props = {
  params: {
    id: string;
  };
};

const page = ({ params }: Props) => {
  const { user } = useAuth();
  const [person, setPerson] = useState<Person | null>(null);
  const [formData, setFormData] = useState<Person>({
    user: "",
    name: "",
    dob: "",
    gender: "Male",
    relationship: "Sibling",
    anniversary: "",
    picture: "",
    occupation: "",
    interests: [],
  });
  const [interest, setInterest] = useState("");
  const [loadingImg, setLoadingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (user) {
      const fetchPerson = async () => {
        const result = await getPerson(params.id, user._id);
        console.log(result);
        setPerson(result);
        setFormData({
          _id: result._id,
          user: result.user,
          name: result.name,
          dob: result.dob,
          gender: result.gender,
          relationship: result.relationship,
          anniversary: result?.anniversary,
          picture: result?.picture,
          occupation: result.occupation,
          interests: [...result?.interests],
        });
      };
      fetchPerson();
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoAdd = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoadingImg(true);
    console.log(loadingImg);
    const reader = new FileReader();
    reader.onloadend = async () => {
      const url = await uploadImage(reader.result);
      setFormData({ ...formData, picture: url });
      setLoadingImg(false);
    };
    if (e.target.files) {
      const file = e.target.files[0];
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!user || !person) throw new Error();
      setFormData({ ...formData, user: user?._id });
      const response = await updatePerson(formData, person._id!);
      if (response._id) {
        console.log(response);
        router.push(`/person/${person._id}`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (!person)
    return (
      <div className="p-20 flex justify-center items-center h-[100vh] w-full">
        <Loader color="#875fb6" height={50} width={50} />
      </div>
    );

  if (loading)
    return (
      <div className="p-20 flex  justify-center items-center h-[100vh] w-full">
        <Loader color="#875fb6" height={50} width={50} />
      </div>
    );

  return (
    <form
      className="md:p-20 pt-20 p-4 flex md:flex-row flex-col-reverse justify-around items-center relative w-full"
      onSubmit={handleSubmit}
    >
      <div className="flex absolute top-40 left-20">
        <Link href={`/person/${params.id}`} className="mr-2">
          <ChevronLeft color="lightgray" />
        </Link>
      </div>
      <div className="">
        <h2 className="flex items-center text-gray-300 text-6xl font-bold mb-3">
          <span className="text-sm">name:</span>
          <Input
            variant="light"
            value={formData.name}
            name="name"
            placeholder="Name"
            onChange={handleChange}
            type="text"
          />
        </h2>
        <h2 className="text-gray-300 flex items-center text-2xl font-bold mb-3">
          <span className="text-sm">date of birth:</span>{" "}
          <Input
            variant="light"
            placeholder="Date of Birth"
            value={formData.dob}
            onChange={handleChange}
            name="dob"
            type="text"
          />
        </h2>
        <h2 className="text-gray-300 flex items-center text-2xl font-bold mb-3">
          <span className="text-sm">relationship:</span>{" "}
          <select
            className={inputVariants()}
            onChange={(e) =>
              //@ts-ignore

              setFormData({ ...formData, relationship: e.target.value })
            }
            value={formData.relationship}
          >
            {relationships.map((rel) => (
              <option className="bg-[#875fb6] p-10">{rel}</option>
            ))}
          </select>
        </h2>
        <h2 className="text-gray-300 flex items-center text-2xl font-bold mb-3">
          <span className="text-sm">gender:</span>{" "}
          <select
            className={inputVariants()}
            onChange={(e) =>
              //@ts-ignore

              setFormData({ ...formData, gender: e.target.value })
            }
            value={formData.gender}
          >
            {genders.map((gender) => (
              <option className="bg-[#875fb6] p-10">{gender}</option>
            ))}
          </select>
        </h2>
        <h2 className="text-gray-300 flex items-center text-2xl font-bold mb-3">
          <span className="text-sm">occupation: </span>
          <Input
            value={formData.occupation}
            variant="light"
            className="m-2 border-[#22004b]"
            placeholder="Occupation"
            name="occupation"
            onChange={handleChange}
            type="text"
          />
        </h2>
        {person.interests?.length ? (
          <>
            <h2 className="text-gray-300 text-2xl font-bold mb-3">
              Interested in:
            </h2>
            <div className="flex flex-wrap">
              {formData.interests?.map((interest, i) => (
                <p
                  key={interest + i}
                  className="p-3 bg-gray-300 font-semibold m-1 pr-4 max-w-fit rounded-full"
                >
                  {interest}
                  <span
                    className="cursor-pointer ml-1 font-semibold"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        interests: formData.interests?.filter(
                          (cur) => cur !== interest
                        ),
                      })
                    }
                  >
                    X
                  </span>
                </p>
              ))}
            </div>
          </>
        ) : (
          <h2 className="text-gray-300 text-2xl font-bold mb-3">
            {person.name} currently has no interests
          </h2>
        )}
        <div className="flex justify-between my-[5px]">
          <Input
            variant="light"
            placeholder="Add an interest"
            name="interest"
            onChange={(e) => setInterest(e.target.value)}
            type="text"
          />
          <Button
            variant="light"
            onClick={() => {
              setFormData({
                ...formData,
                //@ts-ignore

                interests: [...formData?.interests, interest],
              });
              setInterest("");
            }}
          >
            Add Interest
          </Button>
        </div>
        <Button type="submit" className="mt-2" variant="light">
          Submit
        </Button>
      </div>
      <div className="flex relative justify-center md:w-[40%]">
        <Image
          src={
            formData.picture
              ? formData.picture
              : formData.gender === "Male"
              ? Male
              : Female
          }
          alt="profile"
          className="w-full"
          width={200}
          height={200}
        />
        <label
          htmlFor="image"
          className="cursor-pointer absolute bottom-0 left-0 bg-gradient-to-t from-[#33333330] to-transparent p-4 rounded-md"
        >
          {loadingImg ? <Loader /> : <UploadCloud color="lightgray" />}
        </label>
        <input
          id="image"
          className="hidden"
          type="file"
          onChange={handlePhotoAdd}
        />
      </div>
    </form>
  );
};

export default page;
