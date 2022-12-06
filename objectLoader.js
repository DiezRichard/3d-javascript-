 obj = "obj/axis.obj";

 mesh = loadObject(obj);

//LOADER

function loadObject(file)
{
  var request = new XMLHttpRequest();

  let mesh = [];
  request.open("GET", file, false);

  request.onreadystatechange = function()
  {

    if (request.readyState === 4)
    {
      if (request.status === 200 || request.status == 0)
      {
        var obj = request.responseText;
        var str = String(obj);

        //console.log(str);

        let arr = str.split(/\n/);
        let vectors = [];

        //VECTORS
        for (let i = 0; i < arr.length; i++)
        {

          //vectors
          if (arr[i].match(/^v\s/))
          {
            //erase
            let p = arr[i].replace("v ", "");
            let s = p.replace("v ", "");
            //change "," with "."
            s = p.replace(/\,/gm, ".");
            //split into 3 coords
            let v = s.split(/\s/);
            //fill in vector coords in numbers
            let c = { x: (+v[0]), y: (+v[1]), z: (+v[2]) };



            //add vectors

            vectors.push(c);

          }

        } //VECTORS

        //TRIANGLES
        for (let i = 0; i < arr.length; i++)
        {
          //triangles
          if (arr[i].match(/^f/))
          {
            //clean
            let clean = arr[i].replace("f ", "");
            //split
            let split = clean.split(/\s/);

            //take the first value
            let index1 = +split[0].match(/\d+/m);
            let index2 = +split[1].match(/\d+/m);
            let index3 = +split[2].match(/\d+/m);

            let triangle = [];


            triangle.push(vectors[index1 - 1], vectors[index2 - 1], vectors[index3 - 1]);

            mesh.push(triangle);
          }
        } //TRIANGLES i loop


      }

    }
  }
  request.send(null);

  return mesh;
};


//--------
