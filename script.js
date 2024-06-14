const addBtn=document.querySelector("#addBtn")
const main=document.querySelector("#main")

addBtn.addEventListener("click",function() {
	addNote()
})

const saveNotes = () =>{
	const notes= document.querySelectorAll(".note textarea");
	const data=[];
	notes.forEach((note)=>{
		data.push(note.value);
		console.log(data)

		if(data.length===0)
		{
			localStorage.removeItem("notes")
		}
		else
		{
			localStorage.setItem("notes",JSON.stringify(data))
		}	
	})
}




const addNote = (text="") =>{
	const note=document.createElement("div")
	note.classList.add("note")
	note.innerHTML=`
		<div class="tool">
				
				<button class="save">Save</button>
				<button class="trash">Delete</button>
		</div>
			<textarea>${text}</textarea>
	`;

	note.querySelector(".trash").addEventListener(
		"click",function(){
			note.remove()
			saveNotes();
		})

	note.querySelector(".save").addEventListener(
		"click",function(){
			saveNotes()
		})
	note.querySelector("textarea").addEventListener("focusout",
		function(){
			saveNotes()
		})

	main.appendChild(note);
	saveNotes();
}
(
	function(){
		const lsnotes=JSON.parse(localStorage.getItem("notes"));
		console.log(lsnotes)
		if(lsnotes===null)
		{
			addNote()
		}
		else
		{
			lsnotes.forEach( (lsnote) =>{
				addNote(lsnote)
			})
		}	
	}
)()