import React, { useEffect, useState } from "react";
import { PencilIcon, ViewGridAddIcon } from "@heroicons/react/outline";
import Link from "next/link";
import Router from "next/router";
import { checkSession, withSession } from "../utils";
import { useUser } from "../hooks";
import { SkeletonProfile, SkeletonTree } from "../components/Skeleton";
import { fetcher } from "../utils";
import { CreateTreeModal } from "../components/editor/modals";
import { useAppDispatch } from "../store/hook";
import { update_create_tree_modal } from "../store/features/editorSlice";

const Home = () => {
  const { user } = useUser();

  const [allTrees, setAllTrees] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();

  function openModal() {
    dispatch(update_create_tree_modal(true));
  }

  useEffect(() => {
    const getAllTree = async () => {
      setIsLoading(true);
      const url = `${process.env.NEXT_PUBLIC_CODETREE_API}/tree/mine`;

      const result = await fetcher(url, "GET", user?.token);
      setAllTrees(result?.data?.data?.data);
      setIsLoading(false);
    };

    if (user) {
      getAllTree();
    }
  }, [user]);

  const trees = allTrees.map(({ hash, description, name }) => (
    <Link key={hash} href={`/playground/${hash}`}>
      <div className="border h-72 rounded-md overflow-hidden shadow-md flex flex-col">
        <div className=" w-full h-4/5 bg-black cursor-pointer" />
        <div className=" w-full h-1/5 flex flex-col px-5 pt-1">
          <p>{name}</p>
          <p>{description}</p>
        </div>
      </div>
    </Link>
  ));

  return (
    <div style={{ paddingTop: "15vh" }} className="px-4 lg:px-24 pt-4">
      <div className="flex flex-col sm:flex-row w-full justify-between">
        {user ? (
          <div className="">
            <div className="flex">
              <div className="profile-pic-wrapper flex justify-center items-center bg-gradient-to-b from-gray-400 to-pink-300 rounded-full mr-5 shadow-lg">
                <img
                  className="profile-pic rounded-full  object-cover shadow-lg"
                  src={user?.profile?.data?.profile || "/blank-profile.png"}
                  alt="Profile image"
                />
              </div>

              <div className="flex flex-col justify-center">
                <div className="text-xl"> {user?.profile?.data?.name} </div>
                <small className="text-gray-500 ">
                  {user?.profile?.data?.description}
                </small>
                <div className="flex text-2xl mt-2  leading-9 tracking-wide">
                  {user?.profile?.data?.status}
                </div>
                <button
                  onClick={() => Router.push("/settings")}
                  className="mt-3 px-3 flex items-center justify-center shadow-md"
                >
                  Edit profile <PencilIcon className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <SkeletonProfile />
        )}
      </div>
      <div className="mt-5 mb-3 flex justify-between text-2xl">
        <div>Trees</div>
        <div
          className="flex items-center text-xl text-gray-400 cursor-pointer"
          onClick={openModal}
        >
          <ViewGridAddIcon className="w-6 h-6 mr-2" />
          New Tree
        </div>
      </div>
      <div className="pb-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {isLoading ? <SkeletonTree /> : trees}
      </div>
      <CreateTreeModal />
    </div>
  );
};

export default Home;

export const getServerSideProps = withSession(async ({ req, res }) => {
  checkSession(req, res);

  return {
    props: {},
  };
});
