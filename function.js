function make_lines() {
  $("pre#output").html(function (index, html) {
    return html.replace(/^(.*)$/gm, '<span class="line">$1</span>');
  });
}

function make_chunks(inputArray, chunk_size = 10) {
  var perChunk = chunk_size; // items per chunk

  return inputArray.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / perChunk);

    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = []; // start a new chunk
    }

    resultArray[chunkIndex].push(item);

    return resultArray;
  }, []);
}

$("#go").click(function () {
  var chunk_size = $("#quantity").val();
  var lines = $("#input").val().split(/\n/);
  var output = [];
  var html_content = "";

  for (var line of lines) {
    // only push this line if it contains a non whitespace character.
    if (/\S/.test(line)) {
      output.push($.trim(line));
    }
  }
  console.log(output);

  for (let chunk of make_chunks(output, chunk_size)) {
    var text = chunk.join("|");
    console.log(text);
    html_content += text + "\n";
  }
  html_content = html_content.slice(0, -1);

  $("pre#output").empty();
  $("pre#output").html(html_content);
  make_lines();
  $(".alert").removeClass("alert-info").addClass("alert-success").text("Done!");
});

$("#clear").click(function () {
  $("textarea#input").val("");
  $("pre#output").empty();
  $("pre#output").html("Result will be displayed here...");
});

make_lines();
