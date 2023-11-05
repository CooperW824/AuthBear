<template>

<body class="bg-base-100 text-base-100">
    <nav class="bg-primary p-4">
        <div class="flex flex-row">
            <img class="w-10 h-10 mx-0 my-0 rounded-md" src="https://cdn.discordapp.com/attachments/1169289743264133181/1170110832852619396/ea599ef8-d944-4e30-9125-c24e3abe0b28.jpeg?ex=6557d9a2&is=654564a2&hm=097530e1e6cecc1d0a367801bf1a2ed4670388b9ef62501f6d80019aa833f85a&" alt="authbearlogo">
            <span class="text-white text-2xl mx-2">AuthBear</span>
        </div>
        
        <ul class="flex justify-end space-x-4 text-2xl text-white">
            <li><a href="#features">Features</a></li>
            <li><a href="#demo">Demo</a></li>
        </ul>
    </nav>

    <section class="hero bg-base-200 text-white text-center py-20">
        <div class="container mx-auto">
            <h1 class="text-4xl font-bold">Secure Your Accounts with 2-Factor Authentication</h1>
            <p class="text-lg mt-4">Enjoy the security of multi-factor authentication without the hassle. Organize your codes into folders - create, rearange, and delete as you wish.</p>
            <a @click="getStarted" 
            class="btn btn-primary btn-lg mt-6 px-8 py-3">Get Started</a>
        </div>
    </section>

    <section id="features" class="features text-center py-2 text-white bg-base-200">
        <section id="features" class="features text-center py-12 bg-base-200">
            <h2 class="text-3xl font-bold mb-6">Features</h2>
            <div class="flex flex-col md:flex-row justify-center space-y-6 md:space-y-0 md:space-x-6">
                <div class="bg-secondary rounded-lg p-6 shadow-md">
                    <i class="fa fa-lock text-5xl text-primary mb-4"></i>
                    <h3 class="text-xl font-semibold mb-2">Quick Search</h3>
                    <p>Find your codes quickly with a convenient search bar.</p>
                </div>
                <div class="bg-secondary rounded-lg p-6 shadow-md">
                    <i class="fa fa-lock text-5xl text-primary mb-4"></i>
                    <h3 class="text-xl font-semibold mb-2">Clean Organization</h3>
                    <p>Create and manage folders for your codes.</p>
                </div>
                <div class="bg-secondary rounded-lg p-6 shadow-md">
                    <i class="fa fa-mobile text-5xl text-primary mb-4"></i>
                    <h3 class="text-xl font-semibold mb-2">Mobile Compatibility</h3>
                    <p>Use your phone or authenticator app for easy verification.</p>
                </div>
            </div>
        </section>
    </section>
    <section id="demo" class="demo text-center items-center contnet-center py-12 bg-base-200">
        <div class="flex justify-center">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/KoRHScBFKuc?si=DvGzFpcYGJN-0KPA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </div>
        
    </section>

    <footer class="text-center p-4 bg-primary text-white">
        <p>&copy; 2023 AuthBear. All Rights Reserved.</p>
    </footer>

</body>
    
</template>

<script setup>
import {useNewVisitor} from "~/composables/states";
const newVisitor = useNewVisitor();

function getStarted() {
    newVisitor.value=false;
    navigateTo(""); 
}
</script>