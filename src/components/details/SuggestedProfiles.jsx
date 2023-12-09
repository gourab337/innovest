import React from 'react'

const SuggestedProfiles = () => {
  return (
    <div>
      <p className='text-white mb-4'>Suggested Profiles</p>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg bg-opacity-0">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500  bg-opacity-0">
          <tbody className='bg-opacaity-0'>
            <tr class="bg-white border-b  hover:bg-gray-50 dark:hover:bg-gray-600 bg-opacity-0">
              <td class="w-4 p-4 bg-opacity-0">
              </td>
              <th scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                <img class="w-10 h-10 rounded-full" src="/docs/images/people/profile-picture-1.jpg" alt="Jese image"/>
                  <div class="ps-3">
                    <div class="text-base font-semibold">Neil Sims</div>
                    <div class="font-normal text-gray-500">neil.sims@flowbite.com</div>
                  </div>
              </th>
              <td class="px-6 py-4">
                React Developer
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center">
                  <div class="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div> Online
                </div>
              </td>
              
            </tr>
            <tr class="bg-white border-b  hover:bg-gray-50 dark:hover:bg-gray-600 bg-opacity-0">
              <td class="w-4 p-4">
                 
              </td>
              <th scope="row" class="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <img class="w-10 h-10 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="Jese image"/>
                  <div class="ps-3">
                    <div class="text-base font-semibold">Bonnie Green</div>
                    <div class="font-normal text-gray-500">bonnie@flowbite.com</div>
                  </div>
              </th>
              <td class="px-6 py-4">
                Designer
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center">
                  <div class="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div> Online
                </div>
              </td>
              
            </tr>
            <tr class="bg-white border-b  bg-opacity-0 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td class="w-4 p-4">
                 
              </td>
              <th scope="row" class="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <img class="w-10 h-10 rounded-full" src="/docs/images/people/profile-picture-2.jpg" alt="Jese image"/>
                  <div class="ps-3">
                    <div class="text-base font-semibold">Jese Leos</div>
                    <div class="font-normal text-gray-500">jese@flowbite.com</div>
                  </div>
              </th>
              <td class="px-6 py-4">
                Vue JS Developer
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center">
                  <div class="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div> Online
                </div>
              </td>
              
            </tr>
            <tr class="bg-white border-b  bg-opacity-0 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td class="w-4 p-4">
              </td>
              <th scope="row" class="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <img class="w-10 h-10 rounded-full" src="/docs/images/people/profile-picture-5.jpg" alt="Jese image"/>
                  <div class="ps-3">
                    <div class="text-base font-semibold">Thomas Lean</div>
                    <div class="font-normal text-gray-500">thomes@flowbite.com</div>
                  </div>
              </th>
              <td class="px-6 py-4">
                UI/UX Engineer
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center">
                  <div class="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div> Online
                </div>
              </td>
              
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default SuggestedProfiles
