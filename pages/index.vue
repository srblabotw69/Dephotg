 
<template>
 
       
    <myHeader />


    <mySidebar />
 
        <div class="p-0 sm:ml-64 mt-2">
    <section class="bg-white dark:bg-gray-900">
      <div class="py-2 px-2 mx-auto max-w-screen-xl lg:py-16">
        <div
          class="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 md:p-12 mb-6"
        >
        
          <h1 class="text-gray-900 dark:text-white text-3xl md:text-5xl font-extrabold mb-2">Welcome to dePhotg!</h1>
          <p class="text-lg font-normal text-gray-600 dark:text-gray-400 mb-6">
            dePhotg is a decentralized web photography app allowing you to manage and share your photos with your
            friends and family. In addition, verifible credentials will indicated whether the photo is AI generated or
            not.
          </p>

          <div class="text-2xl mb-4 rounded-lg">
            <div>
              Number of photos in web node:&nbsp;&nbsp;
              <span
                class="bg-yellow-100 text-yellow-800 text-m font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-yellow-300 border border-yellow-300"
                >{{ cntList }}
              </span>
            </div>
          </div>
          
        </div>
        <div class="grid md:grid-cols-3 gap-6">
          <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              <img class="rounded-t-lg" src="./images/image-1.jpg" alt="" />
            </a>
            <div class="p-5">
              <a href="#">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Shared Photo Gallery
                </h5>
              </a>
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Manage a set of photos towards your goals with friends.
              </p>
   
              <router-link
                to="/dephotg/photo"
                class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Go to gallery
                <svg
                  class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </router-link>
              
            </div>
          </div>
          <div class="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-12">
            <h2 class="text-gray-900 dark:text-white text-3xl font-extrabold mb-2">Decentralized Identifier</h2>
            <p class="text-lg font-normal text-gray-500 dark:text-gray-400 mb-4">Copy your DID here.</p>
            
            <button id="copy-did" class="btn" @click="copyDID">Copy your DID</button>
          </div>
          <div class="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-12">
            <a
              href="#"
              class="bg-purple-100 text-purple-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-md dark:bg-gray-700 dark:text-purple-400 mb-2"
            >
              <svg
                class="w-2.5 h-2.5 me-1.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 4 1 8l4 4m10-8 4 4-4 4M11 1 9 15"
                />
              </svg>
              Code
            </a>
            <h2 class="text-gray-900 dark:text-white text-3xl font-extrabold mb-2">Verifible Credentials</h2>
            <p class="text-lg font-normal text-gray-500 dark:text-gray-400 mb-4">
              Issue a verifible credentials for each photo.
            </p>
             
          </div>
        </div>
      </div>
    </section>
 
  </div>

 
 
</template>

<script setup>
import { ref } from 'vue';
import protocolDefinition from "assets/shared-todo-protocol.json"; 
import myHeader from "./header.vue";
import mySidebar from "./sidebar.vue";

let todoRecipient

const { $web5: web5, $myDID: myDID } = useNuxtApp();

 
const sharedList = ref([]);
 
const getTodoRecipient = () => {
    console.log('Running getTodoRecipient...', sharedList.author)
    if (myDID === sharedList.author) {
        return sharedList.recipient;
    } else {
        return sharedList.author;
    }
}


onBeforeMount(async () => {
    console.log("this is your DID", myDID);

    await configureProtocol();

    // Fetch shared todo lists.
    const { records } = await web5.dwn.records.query({
        message: {
            filter: {
                schema: protocolDefinition.types.list.schema,
            },
            dateSort: 'createdAscending'
        }
    });

  
    todoRecipient = await getTodoRecipient();
 
    for (let record of records) {
        const data = await record.data.json();
        const list = { record, data, id: record.id };
 
        sharedList.value.push(list);
    }
 

    initFlowbite();
 

    createWalletOntology();

})
 

const configureProtocol = async () => {
    const { protocols, status } = await web5.dwn.protocols.query({
        message: {
            filter: {
                protocol: protocolDefinition.protocol,
            }
        }
    });

    if (status.code !== 200) {
        alert('Error querying protocols');
        console.error('Error querying protocols', status);
        return;
    }

    if (protocols.length > 0) {
        console.log('Protocol already exists');
        return;
    }

    // configure protocol on local DWN
    const { status: configureStatus, protocol } = await web5.dwn.protocols.configure({
        message: {
            definition: protocolDefinition,
        }
    });

    console.log('Protocol configured', configureStatus, protocol);

    // configuring protocol on remote DWN
    const { status: configureRemoteStatus } = protocol.send(myDID);
    console.log('Protocol configured on remote DWN', configureRemoteStatus);
}


// async function toggleTodoComplete(todoItem) {
//     let toggledTodo;
//     let updatedTodoData;

//     for (let todo of todoItems.value) {
//         if (todoItem.id === todo.id) {
//             toggledTodo = todo;
//             todo.data.completed = !todo.data.completed;
//             updatedTodoData = { ...toRaw(todo.data) };
//             break;
//         }
//     }

//     // Get record in DWN
//     const { record } = await web5.dwn.records.read({
//         message: {
//             recordId: toggledTodo.id,
//         }
//     });

//     // Update the record in DWN
//     await record.update({ data: updatedTodoData });

//     const { status: sendStatus } = await record.send(todoRecipient);

//     if (sendStatus.code !== 202) {
//         console.log("Unable to send updated data to target did:", sendStatus);
//         return;
//     }
//     else {
//         console.log("Sent todo update to recipient");
//     }
// }

// const uploadImage = async (e) => {
//     const image = e.target.files[0];
//     console.log(image)

//     const reader = new FileReader();
//     reader.readAsDataURL(image);
//     reader.onload = e => {
//         previewImage.value = e.target.result;

//         // console.log(previewImage.value);
//         // console.log(e.target.result);

//         photo.value = previewImage.value;
//     };
// }


</script>


<style scoped>
.btn {
    padding: 0.5rem 1rem;
    background-color: #3490dc;
    color: white;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
    transition: background-color 0.3s;
}

.btn-secondary {
    padding: 0.5rem 1rem;
    background-color: #ccc;
    color: #333;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
    transition: background-color 0.3s;
}

.btn-secondary:hover {
    background-color: #aaa;
}

.btn:hover {
    background-color: #2779bd;
}
</style>
