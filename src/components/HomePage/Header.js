'use client'
import React from "react";
import JenniLogo from '@/assets/Jenii1.png'
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Card,
  IconButton,
  Input,
  Badge
} from "@/MaterialTailwindNext";
import {
  CubeTransparentIcon,
  UserCircleIcon,
  CodeBracketSquareIcon,
  Square3Stack3DIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
  RocketLaunchIcon,
  Bars2Icon,
} from "@heroicons/react/24/solid";
 
// profile menu component
const profileMenuItems = [
  {
    label: "My Profile",
    icon: UserCircleIcon,
  },
  {
    label: "Edit Profile",
    icon: Cog6ToothIcon,
  },
  {
    label: "Inbox",
    icon: InboxArrowDownIcon,
  },
  {
    label: "Help",
    icon: LifebuoyIcon,
  },
  {
    label: "Sign Out",
    icon: PowerIcon,
  },
];
 
function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
 
  const closeMenu = () => setIsMenuOpen(false);
 
  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto "
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="tania andrew"
            className="border border-pink-300 p-0.5"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform text-pink-500 ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={closeMenu}
              className={`flex items-center gap-2 rounded ${
                isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
              }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color={isLastItem ? "red" : "inherit"}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}
 
// nav list menu
const navListMenuItems = [
  {
    title: "@material-tailwind/html",
    description:
      "Learn how to use @material-tailwind/html, packed with rich components and widgets.",
  },
  {
    title: "@material-tailwind/react",
    description:
      "Learn how to use @material-tailwind/react, packed with rich components for React.",
  },
  {
    title: "Material Tailwind PRO",
    description:
      "A complete set of UI Elements for building faster websites in less time.",
  },
];
 
function NavListMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
 
  const renderItems = navListMenuItems.map(({ title, description }) => (
    <a href="#" key={title}>
      <MenuItem>
        <Typography variant="h6" color="blue-gray" className="mb-1">
          {title}
        </Typography>
        <Typography variant="small" color="gray" className="font-normal">
          {description}
        </Typography>
      </MenuItem>
    </a>
  ));
 
  return (
    <React.Fragment>
      <Menu allowHover open={isMenuOpen} handler={setIsMenuOpen}>
        <MenuHandler>
          <Typography as="a" href="#" variant="small" className="font-normal">
            <MenuItem className="hidden items-center gap-2 font-medium text-blue-gray-900 lg:flex lg:rounded-full">
              <Square3Stack3DIcon className="h-[18px] w-[18px] text-blue-gray-500" />{" "}
              Shop by Category{" "}
              <ChevronDownIcon
                strokeWidth={2}
                className={`h-3 w-3 transition-transform ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
            </MenuItem>
          </Typography>
        </MenuHandler>
        <MenuList className="hidden w-[36rem] grid-cols-7 gap-3 overflow-visible lg:grid">
          <Card
            color="blue"
            shadow={false}
            variant="gradient"
            className="col-span-3 grid h-full w-full place-items-center rounded-md"
          >
            <RocketLaunchIcon strokeWidth={1} className="h-28 w-28" />
          </Card>
          <ul className="col-span-4 flex w-full flex-col gap-1">
            {renderItems}
          </ul>
        </MenuList>
      </Menu>
      <MenuItem className="flex items-center gap-2 font-medium text-blue-gray-900 lg:hidden">
        <Square3Stack3DIcon className="h-[18px] w-[18px] text-blue-gray-500" />{" "}
        Shop by Category{" "}
      </MenuItem>
      <ul className="ml-6 flex w-full flex-col gap-1 lg:hidden">
        {renderItems}
      </ul>
    </React.Fragment>
  );
}
 
// nav list component
const navListItems = [
  {
    label: "Shop by Occasion",
    icon: UserCircleIcon,
  },
  {
    label: "Hot Collections",
    icon: CubeTransparentIcon,
  },
  {
    label: "Budget Gift",
    icon: CodeBracketSquareIcon,
  },
  {
    label: "Premium Gifts",
    icon: CodeBracketSquareIcon,
  },
];
 
export function NavList() {
  return (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      <NavListMenu />
      {navListItems.map(({ label, icon }, key) => (
        <Typography
          key={label}
          as="a"
          href="#"
          variant="small"
          color="gray"
          className="font-medium text-blue-gray-500"
        >
          <MenuItem className="flex items-center gap-2 lg:rounded-full">
            {React.createElement(icon, { className: "h-[18px] w-[18px]" })}{" "}
            <span className="text-gray-900"> {label}</span>
          </MenuItem>
        </Typography>
      ))}
    </ul>
  );
}
 function Search(){
        return(
                <div className="hidden items-center gap-x-2 lg:flex w-max mx-auto">
          <div className="relative flex w-full gap-2 md:w-max">
            <Input
              type="search"
              placeholder="Search"
              containerProps={{
                className: "min-w-[288px]   rounded-sm ",
              }}
              className=" !border-t-blue-gray-300 pl-9 placeholder:text-[#F42222] !border-black focus:!border-[#F42222]"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <div className="!absolute left-3 top-[13px] text-gray-700">
              <svg
                width="13"
                height="14"
                viewBox="0 0 14 15"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.97811 7.95252C10.2126 7.38634 10.3333 6.7795 10.3333 6.16667C10.3333 4.92899 9.84167 3.742 8.9665 2.86683C8.09133 1.99167 6.90434 1.5 5.66667 1.5C4.42899 1.5 3.242 1.99167 2.36683 2.86683C1.49167 3.742 1 4.92899 1 6.16667C1 6.7795 1.12071 7.38634 1.35523 7.95252C1.58975 8.51871 1.93349 9.03316 2.36683 9.4665C2.80018 9.89984 3.31462 10.2436 3.88081 10.4781C4.447 10.7126 5.05383 10.8333 5.66667 10.8333C6.2795 10.8333 6.88634 10.7126 7.45252 10.4781C8.01871 10.2436 8.53316 9.89984 8.9665 9.4665C9.39984 9.03316 9.74358 8.51871 9.97811 7.95252Z"
                  fill="currentColor"
                />
                <path
                  d="M13 13.5L9 9.5M10.3333 6.16667C10.3333 6.7795 10.2126 7.38634 9.97811 7.95252C9.74358 8.51871 9.39984 9.03316 8.9665 9.4665C8.53316 9.89984 8.01871 10.2436 7.45252 10.4781C6.88634 10.7126 6.2795 10.8333 5.66667 10.8333C5.05383 10.8333 4.447 10.7126 3.88081 10.4781C3.31462 10.2436 2.80018 9.89984 2.36683 9.4665C1.93349 9.03316 1.58975 8.51871 1.35523 7.95252C1.12071 7.38634 1 6.7795 1 6.16667C1 4.92899 1.49167 3.742 2.36683 2.86683C3.242 1.99167 4.42899 1.5 5.66667 1.5C6.90434 1.5 8.09133 1.99167 8.9665 2.86683C9.84167 3.742 10.3333 4.92899 10.3333 6.16667Z"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
          <Button size="md" className="rounded-lg bg-pink-500">
            Search
          </Button>
        </div>
        )
 }
export default function ComplexNavbar() {
  const [isNavOpen, setIsNavOpen] = React.useState(false);
 
  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
 
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false),
    );
  }, []);
 
  return (
    <Navbar className="mx-auto  p-2 lg:pl-6 shadow-none sticky top-0 z-50">
      <div className="relative mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          className="mr-4 ml-2 cursor-pointer py-1.5 font-medium "
        >
          {/* <JenniLogo  className='h-10'/> */}
          <img src='/images/jenii1.png' alt="" />
        </Typography>
        <Search/>
        <IconButton
          size="sm"
          color="blue-gray"
          variant="text"
          onClick={toggleIsNavOpen}
          className="ml-auto mr-2 lg:hidden"
        >
          <Bars2Icon className="h-6 w-6" />
        </IconButton>
        <div className=" flex gap-3 text-pink-500">
          <IconButton color="white" className=" shadow-none">
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
  <g clip-path="url(#clip0_38_381)">
    <path d="M28 30H16V22H14V30H8V22H6V30C6 30.5304 6.21071 31.0391 6.58579 31.4142C6.96086 31.7893 7.46957 32 8 32H28C28.5304 32 29.0391 31.7893 29.4142 31.4142C29.7893 31.0391 30 30.5304 30 30V22H28V30Z" fill="black"/>
    <path d="M33.79 13.27L29.71 5.11C29.5444 4.77679 29.2892 4.49637 28.973 4.30028C28.6568 4.10419 28.2921 4.0002 27.92 4H8.08002C7.70793 4.0002 7.34328 4.10419 7.02706 4.30028C6.71084 4.49637 6.45559 4.77679 6.29002 5.11L2.21002 13.27C2.07071 13.5495 1.99879 13.8577 2.00002 14.17V17.25C1.9991 17.7173 2.16185 18.1702 2.46002 18.53C2.90067 19.0351 3.44491 19.4395 4.05575 19.7156C4.66658 19.9916 5.32969 20.133 6.00002 20.13C7.09379 20.1317 8.1542 19.7535 9.00002 19.06C9.84582 19.7539 10.906 20.1331 12 20.1331C13.094 20.1331 14.1542 19.7539 15 19.06C15.8458 19.7539 16.906 20.1331 18 20.1331C19.094 20.1331 20.1542 19.7539 21 19.06C21.8458 19.7539 22.906 20.1331 24 20.1331C25.094 20.1331 26.1542 19.7539 27 19.06C27.9442 19.8352 29.1521 20.2142 30.3699 20.1172C31.5877 20.0202 32.7204 19.4549 33.53 18.54C33.8318 18.1816 33.9981 17.7285 34 17.26V14.17C34.0012 13.8577 33.9293 13.5495 33.79 13.27ZM30 18.13C29.5729 18.129 29.1522 18.0259 28.773 17.8294C28.3938 17.6328 28.067 17.3484 27.82 17L27 15.88L26.19 17C25.9383 17.3431 25.6093 17.6221 25.2297 17.8144C24.8501 18.0067 24.4305 18.1069 24.005 18.1069C23.5795 18.1069 23.1599 18.0067 22.7803 17.8144C22.4007 17.6221 22.0717 17.3431 21.82 17L21 15.88L20.19 17C19.9383 17.3431 19.6093 17.6221 19.2297 17.8144C18.8501 18.0067 18.4305 18.1069 18.005 18.1069C17.5795 18.1069 17.1599 18.0067 16.7803 17.8144C16.4007 17.6221 16.0717 17.3431 15.82 17L15 15.88L14.19 17C13.9383 17.3431 13.6093 17.6221 13.2297 17.8144C12.8501 18.0067 12.4306 18.1069 12.005 18.1069C11.5795 18.1069 11.1599 18.0067 10.7803 17.8144C10.4007 17.6221 10.0717 17.3431 9.82001 17L9.00002 15.88L8.18002 17C7.93299 17.3484 7.60625 17.6328 7.22704 17.8294C6.84784 18.0259 6.42714 18.129 6.00002 18.13C5.62315 18.1346 5.24967 18.0584 4.9047 17.9066C4.55972 17.7548 4.25125 17.5309 4.00002 17.25V14.17L8.08002 6H27.92L32 14.16V17.22C31.7503 17.5049 31.4428 17.7334 31.098 17.8903C30.7531 18.0472 30.3789 18.1289 30 18.13Z" fill="black"/>
  </g>
  <defs>
    <clipPath id="clip0_38_381">
      <rect width="36" height="36" fill="white"/>
    </clipPath>
  </defs>
</svg>
          </IconButton>
          <Badge content="5" color="pink">
          <IconButton color="white" className=" shadow-none">
          <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
  <path d="M19.125 20.25C19.7217 20.25 20.294 20.4871 20.716 20.909C21.1379 21.331 21.375 21.9033 21.375 22.5C21.375 23.0967 21.1379 23.669 20.716 24.091C20.294 24.5129 19.7217 24.75 19.125 24.75C18.5283 24.75 17.956 24.5129 17.534 24.091C17.1121 23.669 16.875 23.0967 16.875 22.5C16.875 21.2512 17.8762 20.25 19.125 20.25ZM1.125 2.25H4.80375L5.86125 4.5H22.5C22.7984 4.5 23.0845 4.61853 23.2955 4.8295C23.5065 5.04048 23.625 5.32663 23.625 5.625C23.625 5.81625 23.5687 6.0075 23.49 6.1875L19.4625 13.4663C19.08 14.1525 18.3375 14.625 17.4937 14.625H9.1125L8.1 16.4587L8.06625 16.5938C8.06625 16.6683 8.09588 16.7399 8.14863 16.7926C8.20137 16.8454 8.27291 16.875 8.3475 16.875H21.375V19.125H7.875C7.27826 19.125 6.70597 18.8879 6.28401 18.466C5.86205 18.044 5.625 17.4717 5.625 16.875C5.625 16.4812 5.72625 16.11 5.895 15.795L7.425 13.0387L3.375 4.5H1.125V2.25ZM7.875 20.25C8.47174 20.25 9.04403 20.4871 9.46599 20.909C9.88795 21.331 10.125 21.9033 10.125 22.5C10.125 23.0967 9.88795 23.669 9.46599 24.091C9.04403 24.5129 8.47174 24.75 7.875 24.75C7.27826 24.75 6.70597 24.5129 6.28401 24.091C5.86205 23.669 5.625 23.0967 5.625 22.5C5.625 21.2512 6.62625 20.25 7.875 20.25ZM18 12.375L21.1275 6.75H6.9075L9.5625 12.375H18Z" fill="black"/>
</svg>
          </IconButton>
          </Badge>
        <Button className=" whitespace-nowrap text-pink-600" size="sm" variant="text">
          <span>Log In</span>
        </Button>
        <ProfileMenu />
        </div>
      </div>
      <MobileNav open={isNavOpen} className="overflow-scroll">
        <NavList />
        <Search/>
      </MobileNav>
    </Navbar>
  );
}