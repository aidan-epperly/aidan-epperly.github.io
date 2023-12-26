---
title: "Structure Preserving Decompositions"
excerpt_separator: "<!--more-->"
categories:
  - Blog
permalink: "matdec"
tags: Linear-Algebra, Polar-Decomposition, QR-Decomposition, Eigen-Decomposition, Spectral-Decomposition, Singular-Value-Decomposition. Jordan-Decomposition
---

I expect to spend a lot of time writing about matrices on this blog, and so I wanted to make a single post where I can put all my thoughts on various different structure revealing decompositions for a matrix.

## Structure Revealing Decompositions

So, what is a structure revealing decomposition? Well, the simplest answer is to restate the name itself: a structure revealing decomposition is a decomposition of one matrix into a product of other matrices that reveals some structure of the original matrix. When I say structure, I really just mean "some property" of the original matrix. These types of matrix decompositions are crucial to almost every matrix computation and are the backbone of so many different algorithms and results. The matrices in our decomposition will always be simpler than the original matrix, otherwise this whole thing would be pointless. So, before we discuss any of the decompositions, we should discuss what I mean by a "simple matrix".

### Notation

Throughout this blog post I will us the following notation and conventions:

 - The letters $$i$$, $$j$$, $$k$$, $$n$$, and $$m$$ will be used exclusively for indexing or to denote the size of matrices.
 - All matrices will be assumed to be real unless otherwise stated, though many if not all of the decompositions will work for complex matrices (if you swap the use of the transpose for the Hermitian transpose).
 - For general matrices, upper case letters near the beginning of the alphabet will be used such as $$A$$, $$B$$, and $$C$$. These matrices are indexed by rows first and then columns. So, to get the element in the $$i$$th row and $$j$$th column it would be written $$A_{ij}$$ and the whole $$i$$th row would be denoted $$A_{i*}$$. 
 - If the matrix should be thought of as a list of its column vectors, upper case letters near the end of the alphabet will be used such as $$X$$, $$Y$$, and $$Z$$. These matrices are indexed first by columns and then rows. So, to get the element in the $$i$$th row and $$j$$th column it would be written $$X_{ji}$$ and the whole $$j$$th column would be denoted $$X_{j*}$$.
 - The letter $$D$$ will be used only for diagonal matrices.
 - The letters $$U$$, $$V$$, $$W$$, and $$Q$$ will exclusively be used for orthogonal matrices.
 - The letter $$I$$ will always denote the identity matrix. The dimension of this matrix will often be infered from context, but may be denoted using a subscript $$I_n$$.
 - For row vectors, lower case letters near the beginning of the alphabet will be used such as $$a$$, $$b$$, and $$c$$.
 - For column vectors, lower case letters near the end of the alphabet will be used such as $$x$$, $$y$$, and $$z$$.
 - The symbols $$e_1,e_2,\dots,e_n$$ will be used to denote the $$n$$ standard basis vectors.

# Simple Matrices

A "simple matrix" is not a technical term, but I think there are certain types of matrices that most people would consider simpler than the others.

## Square Matrices

I debated including this at all, but it must be said that a square matrix is often much simpler to work with. A matrix is said to be square if it has the same number of rows and columns. These are simpler to work with as we don't have to worry as much about our matrix products being well defined. For instance, the multiplication $$ABA$$ only works if both $$A$$ and $$B$$ are square matrices. Sometimes it will be implied that a given decomposition or method only works for square matrices simply by the inclusion of such a product, though this will generally be avoided.

## Diagonal Matrices

Diagonal matrices are the simplest possible matrices. They need not be square, but they are often square. The defining proerty of a diagonal matrix $$D$$ is that $$D_{ij} = 0$$ if $$i \neq j$$. A diagonal matrix is thus uniquely defined by the values on its main diagonal, and thus we sometimes use the notation $$\mathrm{diag}(x)$$ to denote the diagonal matrix with diagonal $$x$$.

Numerous operations are extremely easy to compute with diagonal matrices. Inverting a diagonal matrix $$D$$, for instance, can be done trivially by just replacing every diagonal element $$d_i$$ with $$1/d_i$$. We will discuss more cases later.

## Triangular Matrices

Triangular matrices come in two flavors: upper triangular and lower triangular. A matrix is upper triangular if $$A_{ij} = 0$$ when $$j > i$$ and lower triangular if $$A_{ij} = 0$$ when $$i > j$$. A matrix is both lower triangular and upper triangular if and only if it is diagonal.

As with diagonal matrices, many matrix operations are much cheaper to compute with a triangular matrix.

## Banded Matrices

Banded matrices can be thought of as a generalization of diagonal matrices where we are allowed to place values on other diagonals. Technically every matrix is "banded" so generally, we want our matrix to have only a small number of bands. An $$n \times n$$ matrix has $$2n - 1$$ diagonals. For convenience, we will call the main diagonal the $$0$$th diagonal. The diagonal that starts at $$A_{1i}$$ the $$i-1$$st diagonal and the diagonal that starts at $$A_{i1}$$ is called the $$-i+1$$st diagonal. The $$1$$st and $$-1$$st diagonal are called the super and subdiagonal respectively.

### Tridiagonal Matrices

A commonly used banded matrix is a tridiagonal matrix. This is a matrix that only has nonzero entries on diagonals $$-1$$, $$0$$, and $$1$$. In other words, there are only nonzero entries on the main, sub, and super diagonals of the matrix. Below is such a matrix:

$$
\begin{pmatrix}
* & * & 0 \\
* & * & * \\
0 & * & *
\end{pmatrix}.
$$

### Bidiagonal Matrices

A somewhat less commonly used banded matrix is the bidiagonal matrix. We will always assume that a bidiagonal matrix only has nonzero entries on the $$0$$th and $$1$$st diagonal. Below is such a matrix:

$$
\begin{pmatrix}
* & * & 0 \\
0 & * & * \\
0 & 0 & *
\end{pmatrix}.
$$

## Block Matrices

Matrices can be built from other matrices. For instance, the matrix

$$
\begin{pmatrix}
A & B \\
C & D
\end{pmatrix}
$$

should be read as the matrix where the upper left terms of the matrix are given by $$A$$, the top right given by $$B$$, the bottom left given by $$C$$, and the bottom right given by $$D$$. So for instance, the matrix

$$
\begin{pmatrix}
I_2 & 0   \\
0   & I_2
\end{pmatrix} = \begin{pmatrix}
1 & 0 & 0 & 0 \\
0 & 1 & 0 & 0 \\
0 & 0 & 1 & 0 \\
0 & 0 & 0 & 1
\end{pmatrix}.
$$

A matrix that can be written as a block matrix with a small number of simple blocks may be considered simple. You can also have block diagonal, block triangular, and block banded matrices which work exactly as above but with matrices instead of numbers.

## Sparse Matrices

The definition of a sparse matrix is not very specific, but it generally means that a lot of the entries of the matrix are zero. Usually, there should be $$O(n)$$ or $$O(n \log(n))$$ nonzero elements in the matrix in order for it to be considered sparse. So a diagonal, tridiagonal, or bidiagonal matrix are all sparse, but a general triangular matrix will not be. Sparse matrices usually require unique data structures and algorithms to work with, but the advantages can be *dramatic*.

## Orthogonal Matrices

A matrix $$Q$$ is orthogonal if it satisfies the equality $$Q Q^T = I$$. Equivalently, a matrix is orthogonal if it is square and its columns are orthonormal (orthogonal and norm $$1$$). Orthogonal matrices are extremely easy to invert, which makes them very very useful. They also are *isometries* meaning that they do not change the length of vectors upon application, at least if you use the Euclidean norm. So, if $$Q$$ is an orthoonal matrix then $$||Qx|| = ||x||$$. If $$X$$ is orthogonal, then the projection of a vector $$y$$ onto $$\mathrm{span}(X)$$ is just given by $$y^T X$$.

Along with the diagonal matrix, orthogonal matrices should be thought of as the gold standard for simple matrices.

### Householder Reflectors

Suppose we have a vector $$x$$. We can ask the question: does there exist a matrix $$Q$$ such that $$Qx = e_1$$? Well, if $$||x|| \neq 1$$ the answer *must* be no as $$Q$$ is an isometry. But, if we revise our question to ask if there is a $$Q$$ mapping $$x$$ to $$||x|| e_1$$ then the answer is yes! One such choice of $$Q$$ is the Householder reflector.

The Householder reflector $$H_u$$ is an orthogonal matrix that reflects a vector across the line spanned by the unit vector $$u$$. It is computed using the simple formula $$H_u = I - 2 u u^T$$ where $$u$$ is a unit vector. In order to map the vector $$x$$ to the vector $$y$$ of the same length, we let $$v = \frac{x + y}{2}$$ be the average of the two vectors and then define $$u = \frac{v}{||v||}$$ as the unit vector in the direction of $$v$$. 