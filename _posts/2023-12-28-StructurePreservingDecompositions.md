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
 - For general matrices, upper case letters near the beginning of the alphabet will be used, such as $$A$$, $$B$$, and $$C$$. These matrices are indexed by rows first and then columns. So, to get the element in the $$i$$th row and $$j$$th column it would be written $$A_{ij}$$ and the whole $$i$$th row would be denoted $$A_{i*}$$. 
 - If the matrix should be thought of as a list of its column vectors, upper case letters near the end of the alphabet will be used, such as $$X$$, $$Y$$, and $$Z$$. These matrices are indexed first by columns and then rows. So, to get the element in the $$i$$th row and $$j$$th column it would be written $$X_{ji}$$ and the whole $$j$$th column would be denoted $$X_{j*}$$.
 - The letter $$D$$ will be used only for diagonal matrices.
 - The letters $$U$$, $$V$$, $$W$$, and $$Q$$ will exclusively be used for orthogonal matrices.
 - The letter $$I$$ will always denote the identity matrix. The dimension of this matrix will often be inferred from context, but may be denoted using a subscript $$I_n$$.
 - For row vectors, lower case letters near the beginning of the alphabet will be used, such as $$a$$, $$b$$, and $$c$$.
 - For column vectors, lower case letters near the end of the alphabet will be used, such as $$x$$, $$y$$, and $$z$$.
 - The symbols $$e_1,e_2,\dots,e_n$$ will be used to denote the $$n$$ standard basis vectors.

# Simple Matrices

A "simple matrix" is not a technical term, but I think there are certain types of matrices that most people would consider simpler than the others.

## Square Matrices

I debated including this at all, but it must be said that a square matrix is often much simpler to work with. A matrix is said to be square if it has the same number of rows and columns. These are simpler to work with as we don't have to worry as much about our matrix products being well defined. For instance, the multiplication $$ABA$$ only works if both $$A$$ and $$B$$ are square matrices. Sometimes it will be implied that a given decomposition or method only works for square matrices simply by the inclusion of such a product, though this will generally be avoided.

## Diagonal Matrices

Diagonal matrices are the simplest possible matrices. They need not be square, but they are often square. The defining property of a diagonal matrix $$D$$ is that $$D_{ij} = 0$$ if $$i \neq j$$. A diagonal matrix is thus uniquely defined by the values on its main diagonal, and thus we sometimes use the notation $$\mathrm{diag}(x)$$ to denote the diagonal matrix with diagonal $$x$$.

Numerous operations are extremely easy to compute with diagonal matrices. Inverting a diagonal matrix $$D$$, for instance, can be done trivially by just replacing every diagonal element $$d_i$$ with $$1/d_i$$. We will discuss more cases later.

## Triangular Matrices

Triangular matrices come in two flavors: upper triangular and lower triangular. A matrix is upper triangular if $$A_{ij} = 0$$ when $$j > i$$ and lower triangular if $$A_{ij} = 0$$ when $$i > j$$. A matrix is both lower triangular and upper triangular if and only if it is diagonal.

As with diagonal matrices, many matrix operations are much cheaper to compute with a triangular matrix.

## Banded Matrices

Banded matrices can be thought of as a generalization of diagonal matrices where we are allowed to place values on other diagonals. Technically every matrix is "banded" so generally, we want our matrix to have only a small number of bands. An $$n \times n$$ matrix has $$2n - 1$$ diagonals. For convenience, we will call the main diagonal the $$0$$th diagonal. The diagonal that starts at $$A_{1i}$$ is called the $$i-1$$st diagonal, and the diagonal that starts at $$A_{i1}$$ is called the $$-i+1$$st diagonal. The $$1$$st and $$-1$$st diagonal are called the super and subdiagonal respectively.

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

A matrix $$Q$$ is orthogonal if it satisfies the equality $$Q Q^T = I$$. Equivalently, a matrix is orthogonal if it is square and its columns are orthonormal (orthogonal and norm $$1$$). Orthogonal matrices are extremely easy to invert, which makes them very very useful. They also are *isometries* meaning that they do not change the length of vectors upon application, at least if you use the Euclidean norm. So, if $$Q$$ is an orthogonal matrix then $$\|Qx\| = \|x\|$$. If $$X$$ is orthogonal, then the projection of a vector $$y$$ onto $$\mathrm{span}(X)$$ is just given by $$y^T X$$.

Along with the diagonal matrix, orthogonal matrices should be thought of as the gold standard for simple matrices.

### Householder Reflectors

Suppose we have a vector $$x$$. We can ask the question: does there exist a matrix $$Q$$ such that $$Qx = e_1$$? Well, if $$\|x\| \neq 1$$ the answer *must* be no as $$Q$$ is an isometry. But, if we revise our question to ask if there is a $$Q$$ mapping $$x$$ to $$\|x\| e_1$$ then the answer is yes! One such choice of $$Q$$ is the Householder reflector.

The Householder reflector $$H_u$$ is an orthogonal matrix that reflects a vector across the line spanned by the unit vector $$u$$. It is computed using the simple formula $$H_u = I - 2 u u^T$$ where $$u$$ is a unit vector. In order to map the vector $$x$$ to the vector $$y$$ of the same length, we let $$v = \frac{x + y}{2}$$ be the average of the two vectors and then define $$u = \frac{v}{\|v\|}$$ as the unit vector in the direction of $$v$$.

## Symmetric Matrices

A matrix $$A$$ is symmetric if $$A = A^T$$. Symmetric matrices are wonderful mathematical objects with a number of excellent properties. I have taken entire classes where we never worked with nonsymmetric matrices. One particularly useful property of a symmetric matrix is that all of its eigenvalues must be real numbers.

### Positive Definite Matrices

A symmetric matrix $$A$$ is said to be positive definite if all of its eigenvalues are positive. Alternatively and equivalently, for all nonzero vectors $$x$$, the real number $$x^T A x > 0$$. So, in particular, the diagonal element $$A_{ii} = e_i^T A e_i > 0$$, which implies that the diagonal of $$A$$ is positive. If we replace every use of $$>$$ in the preceeding discussion with $$\geq$$, then we call such a matrix *positive semidefinite*.

# Structure Revealing Decompositions

Now that we have extensively discussed what I mean when I say a matrix is simple, we can finally talk about some structure revealing decompositions. I am not going to go very deep into how these decompositions are actually computed, but a cursory Google search should yield many implementations.

## Solving Linear Systems

### LU Decomposition

If you have ever solved a linear system using Gaussian elimination, you have implicitly computed the LU decomposition. An invertible matrix $$A$$ can be decomposed into a product $$A = LU$$ for $$L$$ a lower triangular matrix and $$U$$ an upper triangular matrix (this is the one time we will break the convention that $$U$$ is orthgonal). Most methods of computing the $$LU$$ factorization will result in the $$L$$ matrix having only ones on the main diagonal. Such a matrix is called *unitriangular*.

To compute $$L$$ and $$U$$, we can just do Gaussian elimination to create $$U$$, recording the weights in the matrix $$L$$. If $$L$$ is chosen to be unitriangular, then it can be inverted simply by multiplying every element of $$L$$ below the diagonal by $$-1$$. So, for instance

$$
\begin{pmatrix}
1 & 0 \\
a & 1
\end{pmatrix}^{-1} = \begin{pmatrix}
1 & 0 \\
-a & 1
\end{pmatrix}.
$$

The LU decomposition is not generally stable and should be avoided. However, a slight edit can be made to make it much more stable.

It is generally $$O(n^3)$$ to compute the $$LU$$.

#### PLU Decomposition

The PLU decomposition decomposes a matrix $$A$$ into a product $$PLU$$ for $$P$$ a *permutation matrix* and $$LU$$ as above. A permutation matrix is an orthogonal matrix where every column has exactly one nonzero entry whose value is $$1$$. The permutation matrix comes from *pivoting*---the act of switching two rows of the matrix while computing the decomposition.

Pivoting allows us to make the computation of the LU much more stable by always moving the row with the largest first entry up. Essentially, we choose to make the diagonal of $$U$$ as large as possible in order to avoid dividing by a number close to zero.

It is generally $$O(n^3)$$ to compute the $$PLU$$ and it requires the same number of floating point operations as the $$LU$$ but more floating point compares and more memory operations. However, it is essentially always preferable to compute the $$PLU$$. From now on, if I mention the $$LU$$ decomposition, you should assume I actually mean the $$PLU$$ unless I specify.

#### LDU Decomposition, Inverting a Matrix, and the Determinant

The matrix $$U$$ in the LU and PLU is not in generaly unitriangular, but its diagonal cannot have any entries that are zero. So, if we let $$D$$ be the diagonal portion of the matrix $$U$$, we can get a new decomposition $$LDD^{-1}U$$ from the $$LU$$. This is called the $$LDU$$ decomposition. In this decomposition, both $$L$$ and $$U$$ are unitriangular and thus *extremely* easy to invert by just multiplying the nondiagonal entries by $$-1$$. So, given the $$LDU$$ decomposition of $$A$$, we can compute the inverse of $$A$$ using $$A^{-1} = (LDU)^{-1} = U^{-1} D^{-1} L^{-1}$$. All of the latter matrix inverses are trivial.

We can do another trick to compute the determinant of $$A$$. Namely, that

$$
\det(A) = \det(LDU) = \det(L)\det(D)\det(U) = \det(D)
$$

as the determinant of a triangular matrix is just the product of the diagonal. This is indescribably faster than the novel algorithm for computing the determinant which is $$O(n!)$$ and also more stable (assuming we use the PLDU).

#### Storing the PLDU

Because $$L$$ and $$U$$ are unitriangular, their diagonal need not be stored as it will always be $$1$$. So, it turns out we can store the LDU part of the PLDU in a single $$n\times n$$ matrix. The matrix $$P$$ can be stored as a single list of numbers from $$1$$ to $$n$$ using the one line representation of a permutation. Thus, the PLDU requires only $$n$$ more numbers to store than the original matrix. However, if special care is not taken, the PLDU will not be sparse, even if the original matrix is sparse.

### Cholesky Decomposition

The LU decomposition has a best friend: the Cholesky decomposition. The Cholesky decomposition is, on the surface, very similar to the LU decomposition as, much like the LU, it yields a factorization of a matrix $$A$$ into a product of a lower and upper triangular matrix. However, with the Cholesky decomposition the lower triangular matrix is just the transpose of the upper triangular part. The Cholesky decomposition of $$A$$ is given by $$A = R^T R$$. This decomposition exists and is *unique* if $$A$$ is positive definite. If the matrix is positive semidefinite, the decomposition will exist, but it need not be unique. If the matrix is not positive definite/semidefinite then this decomposition will not exist.

The computation of the Cholesky is faster than the LU and does not require pivoting to be stable. Moreover, the Cholesky decomposition computation itself is an efficient method of checking that a matrix is positive definite. I claim this makes a lot of sense. The Cholesky can and should be thought of as a type of square root for matrices. With real numbers, we can only compute the square root of nonnegative numbers. Positive semidefinite matrices are the closest thing matrices have to being "nonnegative," so it makes sense that in order to compute the Cholesky our matrix has to be "nonnegative" as well.