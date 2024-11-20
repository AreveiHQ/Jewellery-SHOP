"use client";
import React, { useState, useEffect } from 'react';
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  Badge,
} from "@/MaterialTailwindNext";
import {
  Bars2Icon,
} from "@heroicons/react/24/solid";
 import Store from '@/assets/Stores.svg'
 import Cart from '@/assets/Cart.svg'
import Link from "next/link";
import Image from "next/image";
import jwt from "jsonwebtoken";
import 'react-toastify/dist/ReactToastify.css';
import dynamic from 'next/dynamic';
const ProfileMenu = dynamic(() => import('./ProfileMenu'));
const NavList = dynamic(() => import('./Navlist'));
const Search = dynamic(() => import('./Search'));
import { getServerCookie } from '@/utils/serverCookie.js';
import debounce from "lodash/debounce";
import { useRouter } from 'next/navigation.js';

export default function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const navigate = useRouter();

 
  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);


  const handleSearch = debounce((query) => {
    onSearch(query);
  }, 500);
 
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) {
        setIsNavOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await getServerCookie('token'); 
      console.log(token,process.env.JWT_SECRET)

      // const data = jwt.verify(token,process.env.JWT_SECRET);
      // console.log(data)
      setIsLoggedIn(!!token); 
    };

    checkLoginStatus(); 
  }, []);


 
  return (
   
    
    <Navbar className="mx-auto p-2 lg:pl-6 shadow-none sticky top-0 z-50">
      <div className="relative mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography as="a" href="#" className="mr-4 ml-2 cursor-pointer py-1.5 font-medium">
          <Image width={80} height={80} src="/images/jenii1.png" alt="Jenii" />
        </Typography>
        {/*  */}
        <Search/>
        {/*  */}
        <IconButton
          size="sm"
          color="blue-gray"
          variant="text"
          onClick={toggleIsNavOpen}
          className="ml-auto mr-2 lg:hidden"
        >
          <Bars2Icon className="h-6 w-6" />
        </IconButton>
        <div className="flex justify-center items-center  gap-3 text-pink-500">
          <div className='pt-2 px-2 cursor-pointer' onClick={()=>navigate.push('/checkout')}>
            <Badge content="5" color="pink">
                <Cart />
            </Badge>
          </div>

          {/* Conditionally render ProfileMenu or Login button */}
          {isLoggedIn ? (
            <ProfileMenu />
          ) : (
              <Link href='/login'>
            <Button
              className="whitespace-nowrap text-pink-600"
              size="sm"
              variant="text"
              
            >
              <span>Log In</span>
                </Button>
              </Link>
          )}
        </div>
      </div>
      <Collapse open={isNavOpen} className="overflow-scroll">
        <NavList />
        <Search />
      </Collapse>
    </Navbar>
  );
}