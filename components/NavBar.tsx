"use client";

import { MainNav } from "@/components/dashboard/main-nav";
import TeamSwitcher from "@/components/dashboard/team-switcher";
import { Search } from "@/components/dashboard/search";
import { UserNav } from "@/components/dashboard/user-nav";

export default function NavBar() {
  return (
    <>
      <div className="hidden flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <TeamSwitcher />
            <UserNav />
          </div>
          <div className="flex h-16 items-center px-4">
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <Search />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
