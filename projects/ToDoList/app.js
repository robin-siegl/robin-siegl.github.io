new Vue({
    el: "#app",
    data: {
        lists: [
            {
                name: "Shopping",
                items: ["Bread", "Water", "Milk", "Butter"]
            },
            {
                name: "Work",
                items: ["Finish Project", "Update Software", "Upload Files"]
            },
            {
                name: "Home",
                items: ["Repair Desk", "Clean the Windows"]
            }
        ],
        currentList: {
            name: "",
            items: []
        },
        createListMenu: false,
        errorMessage: false,
        displayNav: false
    },
    mounted() {
        this.loadList();
    },
    methods: {
        openList: function(listname) {
            for (i = 0; this.lists.length > i; i++) {
                if (this.lists[i].name == listname) {
                    this.currentList.name = this.lists[i].name;
                    this.currentList.items = this.lists[i].items;
                }
            }
            this.hideSideBar();
        },
        addList: function(event) {
            for (i = 0; this.lists.length > i; i++) {
                if (this.lists[i].name.toUpperCase() == event.target.value.toUpperCase()) {
                    return this.errorMessage = true;
                }
            }

            this.errorMessage = false;
            this.createListMenu = false;
            let newList = {
                name: event.target.value,
                items: []
            }
            this.lists.push(newList);

            event.target.value = "";

            // save list locally
            this.saveLocal();
        },
        deleteList: function() {
            for (i = 0; this.lists.length > i; i++) {
                if (this.lists[i].name == this.currentList.name) {
                    this.lists.splice(i,1);
                    let emptyList = {
                        name: event.target.value,
                        items: []
                    }
                    this.currentList.name = "";
                    this.currentList.items = [];
                }
            }

            // save list locally
            this.saveLocal();
        },
        addItem: function(event) {
            this.currentList.items.push(event.target.value);
            event.target.value = "";

            // save list locally
            this.saveLocal();
        },
        deleteItem: function(id) {
            this.currentList.items.splice(id, 1);

            // save list locally
            this.saveLocal();
        },
        saveLocal: function() {
            localStorage.setItem("toDo-vue-list", JSON.stringify(this.lists));
        },
        loadList: function() {
            let loadedLists = JSON.parse(localStorage.getItem("toDo-vue-list"));
            // Check if there is a local list -> if not load default list
            if (loadedLists == null || loadedLists.length <= 0) {
                return false;
            }
            this.lists = JSON.parse(localStorage.getItem("toDo-vue-list"));
        },
        toggleSideBar: function() {
            if (this.displayNav) {
                this.$refs.mobileNavBtn.innerText = "menu";
            } else if (!this.displayNav) {
                this.$refs.mobileNavBtn.innerText = "close";
            }
            this.displayNav = !this.displayNav;
        },
        hideSideBar: function() {
            this.$refs.mobileNavBtn.innerText = "menu";
            this.displayNav = false;
        }
    }
});