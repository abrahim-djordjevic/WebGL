
main();

function main() {
    const canvas = document.querySelector("#glcanvas");
    var gl = canvas.getContext('webgl');

    
    gl.clearColor(0, 0, 0, 1)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    
    var vertexShader = gl.createShader(gl.VERTEX_SHADER)
    gl.shaderSource(vertexShader, [
      'precision mediump float;',
      '',
      'attribute vec3 position;',
      'attribute vec3 vertColor;',
      'varying vec3 fragColor;',
      'uniform mat4 mWorld;',
      'uniform mat4 mView;',
      'uniform mat4 mProj;',
      '',
      'void main() {',
        'fragColor = vertColor;',
        'gl_Position = mProj * mView * mWorld * vec4(position, 1.0);',
      '}'
    ].join('\n'))
    gl.compileShader(vertexShader)
    
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
    gl.shaderSource(fragmentShader, [
      'precision mediump float;',
      '',
      'varying vec3 fragColor;',
      'void main()',
      '{',
      '  gl_FragColor = vec4(fragColor, 1.0);',
      '}'
    ].join('\n'))
    gl.compileShader(fragmentShader)
    
    var program = gl.createProgram()
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)
    
    var vertices = new Float32Array([
    // X     Y     Z     R    G    B
      -0.5, -0.5, -0.5,  1.0, 0.0, 0.0,
       0.5, -0.5, -0.5,  1.0, 0.0, 0.0,
      -0.5,  0.5, -0.5,  1.0, 0.0, 0.0,

      -0.5,  0.5, -0.5,  1.0, 0.0, 0.0,
       0.5,  0.5, -0.5,  1.0, 0.0, 0.0,
       0.5, -0.5, -0.5,  1.0, 0.0, 0.0,

      -0.5, -0.5,  0.5,  0.0, 0.0, 1.0,
       0.5, -0.5,  0.5,  0.0, 0.0, 1.0,
      -0.5,  0.5,  0.5,  0.0, 0.0, 1.0,

      -0.5,  0.5,  0.5,  0.0, 0.0, 1.0,
       0.5,  0.5,  0.5,  0.0, 0.0, 1.0,
       0.5, -0.5,  0.5,  0.0, 0.0, 1.0,

       0.5, -0.5, -0.5,  0.0, 1.0, 0.0,
       0.5,  0.5, -0.5,  0.0, 1.0, 0.0,
       0.5,  0.5,  0.5,  0.0, 1.0, 0.0,

       0.5, -0.5, -0.5,  0.0, 1.0, 0.0,
       0.5, -0.5,  0.5,  0.0, 1.0, 0.0,
       0.5,  0.5,  0.5,  0.0, 1.0, 0.0,

      -0.5, -0.5, -0.5,  1.0, 1.0, 0.0,
      -0.5,  0.5, -0.5,  1.0, 1.0, 0.0,
      -0.5,  0.5,  0.5,  1.0, 1.0, 0.0,
       
      -0.5, -0.5, -0.5,  1.0, 1.0, 0.0,
      -0.5, -0.5,  0.5,  1.0, 1.0, 0.0,
      -0.5,  0.5,  0.5,  1.0, 1.0, 0.0,
       
      -0.5,  0.5, -0.5,  1.0, 0.0, 1.0,
       0.5,  0.5, -0.5,  1.0, 0.0, 1.0,
       0.5,  0.5,  0.5,  1.0, 0.0, 1.0,

      -0.5,  0.5, -0.5,  1.0, 0.0, 1.0,
      -0.5,  0.5,  0.5,  1.0, 0.0, 1.0,
       0.5,  0.5,  0.5,  1.0, 0.0, 1.0,

       0.5,  0.5, -0.5,  0.0, 0.0, 1.0,
      -0.5,  0.5, -0.5,  0.0, 0.0, 1.0,
       0.5, -0.5, -0.5,  0.0, 0.0, 1.0,

       0.5, -0.5, -0.5,  0.0, 0.0, 1.0,
      -0.5, -0.5, -0.5,  0.0, 0.0, 1.0,
      -0.5,  0.5, -0.5,  0.0, 0.0, 1.0,

    ])
    
    var buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)
    
    var color = gl.getAttribLocation(program, 'vertColor')
    var position = gl.getAttribLocation(program, 'position')
    gl.vertexAttribPointer(position, 3, gl.FLOAT, false, 6 * Float32Array.BYTES_PER_ELEMENT, 0);
    gl.vertexAttribPointer(color, 3, gl.FLOAT, false, 6* Float32Array.BYTES_PER_ELEMENT, 3* Float32Array.BYTES_PER_ELEMENT);
    gl.enableVertexAttribArray(position);
    gl.enableVertexAttribArray(color);
    gl.useProgram(program)

    var matWorldUniformLocation = gl.getUniformLocation(program, 'mWorld');
    var matViewUniformLocation = gl.getUniformLocation(program, 'mView');
    var matProjUniformLocation = gl.getUniformLocation(program, 'mProj');

    var worldMatrix = new Float32Array(16);
    var viewMatrix = new Float32Array(16);
    var projMatrix = new Float32Array(16);
    mat4.identity(worldMatrix);
    mat4.lookAt(viewMatrix, [2, 2, -3], [0, 0, 0], [0, 1, 0]);
    mat4.perspective(projMatrix, glMatrix.toRadian(45), canvas.clientWidth / canvas.clientHeight, 0.1, 1000.0);

    gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);
    gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, viewMatrix);
    gl.uniformMatrix4fv(matProjUniformLocation, gl.FALSE, projMatrix);

    var xRotationMatrix = new Float32Array(16);
    var yRotationMatrix = new Float32Array(16);

    //
    // Main render loop
    //
    var identityMatrix = new Float32Array(16);
    mat4.identity(identityMatrix);
    var angle = 0;
    var loop = function () {
      angle = performance.now() / 1000 / 6 * 2 * Math.PI;
      mat4.rotate(yRotationMatrix, identityMatrix, angle, [0, 1, 0]);
      mat4.rotate(xRotationMatrix, identityMatrix, angle / 4, [1, 0, 0]);
      mat4.mul(worldMatrix, yRotationMatrix, xRotationMatrix);
      gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);

      gl.clearColor(0, 0, 0, 1)
      gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, vertices.length / 6)


      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);

    

}